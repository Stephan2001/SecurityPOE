const User = require('../models/userModels.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// JWT token creation
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' });
};

// Login user function
const loginUser = async (req, res) => {
    const { fullName, password } = req.body;

    try {
        const user = await User.login(fullName, password);
        const token = createToken(user._id);

        // Set the cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            sameSite: 'Strict'
        });

        // Send the response
        res.status(200).json({ fullName, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Sign up user function
const signUp = async (req, res) => {
    const { IDNumber, fullName, password, AccountNumber } = req.body;
    try {
        const user = await User.signup(IDNumber, fullName, password, AccountNumber);  
        const token = createToken(user._id);

        // Set the cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            sameSite: 'Lax'
        });

        res.status(200).json({ fullName });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Logout user function
const logoutUser = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    logoutUser,
    loginUser,
    signUp
};
