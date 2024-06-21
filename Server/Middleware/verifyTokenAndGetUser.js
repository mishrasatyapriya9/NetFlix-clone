import jwt from "jsonwebtoken";
import User from "../models/User.js";
// This middleware does the following:get the user details from the token pass in headers in the postman and send the user datails in a object 
//it middleware used in getting the all USER IN UserRoute.js 

// Extracts the access token from the request headers.
// Verifies the access token using jwt.verify.
// Extracts the user ID from the decoded token.
// Finds the user in the database based on the user ID.
// Attaches the user object to the request (req.user) for further processing by downstream middleware or route handlers.
// You can then use this middleware in your routes to authenticate and retrieve the user details based on the access token provided in the request headers.
const verifyTokenAndGetUser = async (req, res, next) => {
  try {
    // Extract the access token from the request headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Access token is missing In Header OR Token is not found in Cookies " });
    }
    const token = authHeader.split(" ")[1];

    // Verify the access token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user ID from the decoded token
    const userId = decodedToken._id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for further processing
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in verifying token and getting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyTokenAndGetUser;
