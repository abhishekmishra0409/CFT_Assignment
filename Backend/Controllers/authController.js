const User = require("../Models/User");
const PasswordResetToken = require("../Models/PasswordResetToken");
const {generateToken, verifyToken} = require("../config/jwt");
const { createPasswordResetToken, verifyPasswordResetToken, markTokenAsUsed } = require("../Services/tokenService");
const {sendPasswordResetEmail} = require("../Services/emailService");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser});
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken({userId: user._id});
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const resetToken = await createPasswordResetToken(user._id);
        // console.log(user)
        await sendPasswordResetEmail(email, resetToken);
        res.status(200).json({ message: "Password reset email sent successfully" });
    }
    catch (error) {
        console.error("Error during forgot password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword, confirmPassword } = req.body;

        // Validate inputs
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Both password fields are required'
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        // Verify token
        const resetToken = await verifyPasswordResetToken(token);

        // Find user
        const user = await User.findById(resetToken.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update password (will be hashed by pre-save hook)
        user.password = newPassword;
        await user.save();

        // Mark token as used
        await markTokenAsUsed(token);

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Password reset error:', error);
        return res.status(400).json({
            success: false,
            message: error.message || 'Password reset failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.verifyToken = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = await verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        res.status(200).json({ message: "Token is valid", user: decoded });
    }
    catch (error) {
        console.error("Error during token verification:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}
