const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

const sendPasswordResetEmail = async (email, token) => {
    try {
        // Define the reset URL (make sure to set FRONTEND_URL in your .env)
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>This link will expire in 5 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};

module.exports = { sendPasswordResetEmail };