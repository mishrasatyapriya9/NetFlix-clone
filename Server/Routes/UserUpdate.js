// const express = require("express");
import  Express  from "express";
const router = Express.Router();
import hashPassword from "../Helper/AuthHelper.js";
import verifyUpdateAuth from "../Middleware/verifyUpdateAuth.js";
import Usermodel from "../models/User.js";
// const  hashPassword  = require("../Helper/AuthHelper.js"); // Import your hashPassword function
// const verifyUpdateAuth = require("../Middleware/verifyUpdateAuth.js"); // Import the middleware

// Update user route with middleware
router.put("/update/:userId", verifyUpdateAuth, async (req, res) => {
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
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
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
      message: "Error updating user information",
      error: error.message,
    });
  }
});

export default router;
