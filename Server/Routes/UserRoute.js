import Express from "express";
const router = Express.Router();
import hashPassword from "../Helper/AuthHelper.js";
import verifyUpdateAuth from "../Middleware/verifyUpdateAuth.js";
import Usermodel from "../models/User.js";
import verifyTokenAndGetUser from "../Middleware/verifyTokenAndGetUser.js";
import toast from "react-hot-toast";
//in register and login there is no need of userid and Authentication token in headers in postman
//when login happen token is generated
//update
router.put("/:userId", verifyUpdateAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    // Validation
    if (!username && !email && !password) {
      return res
        .status(400)
        .send({ message: "At least one field is required for update" });
    }

    // Find user by ID
    const user = await Usermodel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update user fields if provided
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) {
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
      }
    } else {
      res.status(403).json("you can update your account!!");
    }

    // Save updated user to database
    await user.save();

    res.status(200).send({
      success: true,
      message: "User information updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error IN updating user information",
      error: error.message,
    });
  }
});
//delete
router.delete("/:userId", verifyUpdateAuth, async (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    try {
      const { userId } = req.params;

      // Find user by ID
      const user = await Usermodel.findByIdAndDelete(userId);
      res.status(200).send({
        success: true,
        message: "User information deleted successfully",
      });
      toast.success("user deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error in deleting user information",
        error: error.message,
      });
    }
  } else {
    res.status(403).json("you can delete only your account!!");
  }
});
//get one user
router.get("/find/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by ID
    const user = await Usermodel.findById(userId);
    //res.status(200).json(user) then password will also show to them
    const { password, ...info } = user._doc;
    res.status(200).json({
      success: true,
      message: "User details retrieved successfully!!",
      info,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in finding user information",
      error: error.message,
    });
  }
});
//get all user
//http://localhost:8800/api/users?new=true
router.get("/", verifyTokenAndGetUser, async (req, res) => {
  //to see all the data user must be a admin
  const query = req.query.new; //query is can written like this in the api
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await Usermodel.find().sort({ _id: -1 }).limit(5) //use sort for get letest data
        : await Usermodel.find();
      //http://localhost:8800/api/users?new=true testing in postman for get the limit amount of users users
      //http://localhost:8800/api/users by this get all the users
      res.status(200).json({
        success: true,
        message: "All user info retrieved successfully",
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error in Getting All users information",
        error: error.message,
      });
    }
  } else {
    res.status(403).json("you are not allowed to see all the Users!! check the token or update with new token");
  }
});
//get user stats
//->like in jabuary we gain 5 users and in feb we gain 100people
router.get("/stats", async (req, res) => {
  const today = new Date();
  const yearlater = today.setFullYear(today.setFullYear() - 1);
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    const data = await Usermodel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
});
export default router;





// router.get("/stats",()
// This route is designed to fetch statistics about user registration based on the month in which they registered. Here's what it does:

// It initializes today's date and calculates the date one year ago from today's date.
// It creates an array monthsArray containing the names of all the months.
// Inside the try block, it performs an aggregation query using Mongoose's aggregate() method on the Usermodel collection.
// The aggregation pipeline consists of two stages:
// $project stage: This stage extracts the month from the createdAt field of each user document using the $month aggregation operator.
// $group stage: This stage groups the documents by the extracted month and calculates the total count of users registered in each month using the $sum aggregation operator.
// The resulting data contains objects with _id representing the month (as a number) and total representing the total count of users registered in that month.
// Finally, the route respon
// router.put("/:id",verify, async (req, res) => {
//   try {
//     const user = await Usermodel.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       const { password } = req.body;
//       if (!password) {
//         return res.status(400).json({ message: "New password is required" });
//       }

//       // Hash the new password
//       const hashedPassword = await hashPassword(password);

//       // Update the user's password
//       user.password = hashedPassword;
//       await user.save();

//       res
//         .status(200)
//         .json({ success: true, message: "Password updated successfully" });
//     } else {
//       res
//         .status(401)
//         .json({
//           message:
//             "You can only update your own account or you need admin privileges",
//         });
//     }
//   } catch (error) {
//     console.error("Error updating password:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error updating password", error });
//   }
// });
