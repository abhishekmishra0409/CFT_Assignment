const PasswordResetToken = require("../Models/PasswordResetToken");
const crypto = require("crypto");
const mongoose = require("mongoose");

const createPasswordResetToken = async (userId) => {
    // Delete any existing tokens for this user
    await PasswordResetToken.deleteMany({ userId });

    // Generate secure random token
    const tokenString = crypto.randomBytes(32).toString('hex');

    // Create token with 5 minute expiration
    const resetToken = await PasswordResetToken.create({
        userId,
        token: tokenString,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    if (!resetToken) {
        throw new Error('Failed to create password reset token');
    }

    return resetToken.token;
};

const verifyPasswordResetToken = async (token) => {
    const resetToken = await PasswordResetToken.findOne({ token })
        .where('expiresAt').gt(new Date())
        .where('used').equals(false);

    if (!resetToken) {
        throw new Error('Invalid or expired password reset token');
    }

    return resetToken;
};

const markTokenAsUsed = async (token) => {
    const resetToken = await PasswordResetToken.findOneAndUpdate(
        { token },
        { used: true, usedAt: new Date() },
        { new: true }
    );

    if (!resetToken) {
        throw new Error('Invalid password reset token');
    }

    return true;
};

module.exports = {
    createPasswordResetToken,
    verifyPasswordResetToken,
    markTokenAsUsed
};