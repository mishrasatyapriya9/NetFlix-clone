import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUpdateAuth = async (req, res, next) => {
  try {
    // Extract the access token from the request headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Access token is missing" });
    }
    const token = authHeader.split(" ")[1];

    // Verify the access token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user ID from the request parameters
    const { userId } = req.params;

    // Check if the user ID from the token matches the user ID in the request parameters
    if (decodedToken._id !== userId) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You are not authorized to edit this user",
        });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for further processing
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in update authorization middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyUpdateAuth;
