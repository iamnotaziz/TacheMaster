import Task from "../models/task.js";
import User from "../models/user.js";

const createTask = async (req, res) => {
    try {
        const { title, description, commercialId, clientIds, releaseDate, achievementDate } = req.body;

        const task = await Task.create({
            title,
            description,
            commercialId,
            clientIds,
            releaseDate,
            achievementDate,
            state: req.body.state || 'ToDo'
        });

        // Update the commercial's tasks array
        await User.findByIdAndUpdate(commercialId, { $push: { tasks: task._id } });

        // Update each client's tasks array
        if (Array.isArray(clientIds)) {
            for (const clientId of clientIds) {
                await User.findByIdAndUpdate(clientId, { $push: { tasks: task._id } });
            }
        }

        res.json({
            status: "success",
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};


const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("commercialId", "username email")
            .populate("clientIds", "username email")
            .populate("feedbacks"); 

        if (!task) {
            return res.json({ status: "error", message: "Task not found" });
        }

        res.json({
            status: "success",
            message: "Task found",
            data: task,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("commercialId", "username email")
            .populate("clientIds", "username email")
            .populate("feedbacks");

        res.json({
            status: "success",
            message: "Tasks retrieved successfully",
            data: tasks,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const updateTaskById = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("commercialId", "username email")
            .populate("clientIds", "username email")
            .populate("feedbacks");

        if (!task) {
            return res.json({ status: "error", message: "Task not found" });
        }

        res.json({
            status: "success",
            message: "Task updated successfully",
            data: task,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const deleteTaskById = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.json({ status: "error", message: "Task not found" });
        }

        res.json({
            status: "success",
            message: "Task deleted successfully",
            data: task,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getTasksByCommercialId = async (req, res) => {
    try {
        console.log("Fetching tasks for commercialId:", req.params.commercialId);
        const tasks = await Task.find({ commercialId: req.params.commercialId })
            .populate("commercialId", "username email")
            .populate("clientIds", "username email");

        if (!tasks.length) {
            console.log("No tasks found for commercialId:", req.params.commercialId);
        }
        
        res.json({
            status: "success",
            message: "Tasks retrieved successfully",
            data: tasks,
        });
    } catch (error) {
        console.error("Error fetching tasks by commercialId:", error);
        res.json({ status: "error", message: error.message });
    }
};

const getTasksByClientId = async (req, res) => {
    try {
        console.log("Fetching tasks for clientId:", req.params.clientId);
        const tasks = await Task.find({ clientIds: req.params.clientId })
            .populate("commercialId", "username email")
            .populate("clientIds", "username email");

        if (!tasks.length) {
            console.log("No tasks found for clientId:", req.params.clientId);
        }

        res.json({
            status: "success",
            message: "Tasks retrieved successfully",
            data: tasks,
        });
    } catch (error) {
        console.error("Error fetching tasks by clientId:", error);
        res.json({ status: "error", message: error.message });
    }
};


const taskController = {
    createTask,
    getTaskById,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
    getTasksByCommercialId,
    getTasksByClientId,
};

export default taskController;
