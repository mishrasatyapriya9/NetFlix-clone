import Express from "express";
const router = Express.Router();
import hashPassword from "../Helper/AuthHelper.js";
import { comparePassword } from "../Helper/AuthHelper.js";
import Usermodel from "../models/User.js";
import JWT from "jsonwebtoken";

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username) {
      return res.send({ message: "UserName is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }

    //check Username
    const existingUsername = await Usermodel.findOne({ username });
    //checking for previously existing users
    if (existingUsername) {
      return res.status(200).send({
        success: false,
        message:
          "This username is already used for  Registration , please Give a new username",
      });
    }

    //check User
    const existingUser = await Usermodel.findOne({ email });
    //checking for previously existing users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "This Email is already used for  Registration , please login",
      });
    }
    //registering new User to our website
    //changing password to hashed password for more security with AUTHCONTROLLER
    const hashedPassword = await hashPassword(password);

    const user = await new Usermodel({
      username,
      email,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "Registration successfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Registration part",
      error,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password,or fill the email or password",
      });
    }
    const user = await Usermodel.findOne({ email });
    !user && res.status(401).json("invalid email");

    //check the matching of password and hashedpassword
    const match = await comparePassword(password, user.password);
    !match && res.status(401).json("invalid password");

    //create token for that user
    const accessToken = await JWT.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "100d",
      }
    );
    res.status(200).send({
      success: true,
      message: "Login successfull",
      //sending some user detils like phone with a user OBJECT
      user: {
        isAdmin: user.isAdmin,
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });

    //This down code is written by yt video
    // const { password, ...info } = user._doc;
    // res.status(200).send({ ...info, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Login part!!",
      error,
    });
  }
});

export default router;
