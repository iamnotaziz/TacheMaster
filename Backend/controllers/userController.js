import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    try {
        const { username, email, password, role, phone, cin } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username, 
            email,
            password: hashedPassword,
            role,
            phone,
            cin
        });

        res.json({
            status: "success",
            message: "User added successfully",
            data: user,
        });

    } catch (error) {
        res.json({ status: "error", message: error.message });        
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({
            status: "success",
            message: "User found",
            data: user,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });        
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });        
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            message: "User deleted successfully",
            data: user,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });        
    }
};

const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: "success",
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });        
    }
}; 

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ status: "error", message: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ status: "error", message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY);

        // Update local storage with the user info and token
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user._id);
        localStorage.setItem("token", token);

        res.json({
            status: "success",
            message: "Login successful",
            data: user, // Return the actual user object here
            token, 
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};


const changeProfileImage = async (req, res) => {
    try {
        const { id } = req.params; 
        const { imageUrl } = req.body; 

        if (!imageUrl) {
            return res.json({
                status: "error",
                message: "Image URL is required",
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { image: imageUrl },
            { new: true } 
        );

        if (!user) {
            return res.json({
                status: "error",
                message: "User not found",
            });
        }

        res.json({
            status: "success",
            message: "Profile image updated successfully",
            data: user,
        });
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        });
    }
};

const userController = {
    getUserById,
    getAllUsers,
    deleteUserById,
    updateUserById,
    createUser,
    loginController,
    changeProfileImage
};

export default userController;
