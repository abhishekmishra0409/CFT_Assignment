const User = require("../Models/User");

exports.getUser = async (req, res) => {
    try {
        // console.log(req.user.userId)
        const user = await User.findById(req.user.userId).select("-password -__v"); // Exclude password and version field
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error during getting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};