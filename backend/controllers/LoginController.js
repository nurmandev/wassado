const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const router = express.Router();


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

// Login API
// app.post("/api/login", 
    
    

const loginAPI = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    // Validate email and password format
    const emailCheck = emailRegex.test(userEmail);
  //  const passwordCheck = passwordRegex.test(userPassword);

    if (!emailCheck) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    if (!userPassword) {
        return res.status(400).json({ error: "Password must be at least 8 characters long and include at least one number." });
    }

    try {
        // Search for the user by email
        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        // Generate JWT token if the email and password match
        const token = jwt.sign(
            {
                userId: user._id,
                userName: user.userName,
                userEmail: user.userEmail,
                userRole: user.userRole,
            },
            'luxuryStayHotel', 
            { expiresIn: '1d' } 
        );

        return res.status(200).json({
            success: "Login successful",
            userToken: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error. Please try again later." });
    }
};

module.exports = {
    loginAPI
};
