const jwt = require("jsonwebtoken");
const Users = require("../schemas/UserSchema");

const adminController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find();
            const count = users.length;
            res.json({ status: true, message: "Users found", count, data: users });
        } catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await Users.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res
                    .status(404)
                    .json({ status: false, message: "User not found" });
            }
            res.json({ status: true, message: "User deleted successfully" });
        } catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    },
};

module.exports = adminController;
