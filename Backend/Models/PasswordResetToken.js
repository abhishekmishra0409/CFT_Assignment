const mongoose = require("mongoose");
const crypto = require("crypto");

const passwordResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: ()=> new Date(Date.now() + 5*60*1000), // Default expiration time set to 5 minutes from now
    },
    used: {
        type: Boolean,
        default: false,
    },
});


module.exports = mongoose.model("PasswordResetToken", passwordResetTokenSchema);