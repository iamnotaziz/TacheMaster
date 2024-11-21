import Task from "../models/task.js";

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
        });

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
        const tasks = await Task.find({ commercialId: req.params.commercialId })
            .populate("commercialId", "username email")
            .populate("clientIds", "username email");

        res.json({
            status: "success",
            message: "Tasks retrieved successfully",
            data: tasks,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getTasksByClientId = async (req, res) => {
    try {
        const tasks = await Task.find({ clientIds: req.params.clientId })
            .populate("commercialId", "username email")
            .populate("clientIds", "username email");

        res.json({
            status: "success",
            message: "Tasks retrieved successfully",
            data: tasks,
        });
    } catch (error) {
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
