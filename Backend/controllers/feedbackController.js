import Feedback from "../models/feedback.js";

const createFeedback = async (req, res) => {
    try {
        const { text, clientId, taskId } = req.body;

        const feedback = await Feedback.create({
            text,
            clientId,
            taskId,
        });

        res.json({
            status: "success",
            message: "Feedback created successfully",
            data: feedback,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id)
            .populate("clientId", "username email") 
            .populate("taskId", "title description"); 

        if (!feedback) {
            return res.json({ status: "error", message: "Feedback not found" });
        }

        res.json({
            status: "success",
            message: "Feedback retrieved successfully",
            data: feedback,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getFeedbackByTaskId = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ taskId: req.params.taskId })
            .populate("clientId", "username email") 
            .populate("taskId", "title description");

        res.json({
            status: "success",
            message: "Feedback for the task retrieved successfully",
            data: feedbacks,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const updateFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("clientId", "username email")
            .populate("taskId", "title description");

        if (!feedback) {
            return res.json({ status: "error", message: "Feedback not found" });
        }

        res.json({
            status: "success",
            message: "Feedback updated successfully",
            data: feedback,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const deleteFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);

        if (!feedback) {
            return res.json({ status: "error", message: "Feedback not found" });
        }

        res.json({
            status: "success",
            message: "Feedback deleted successfully",
            data: feedback,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getFeedbacksByClientId = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ clientId: req.params.clientId })
            .populate("clientId", "username email")
            .populate("taskId", "title description");

        res.json({
            status: "success",
            message: "Feedback by the client retrieved successfully",
            data: feedbacks,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const feedbackController = {
    createFeedback,
    getFeedbackById,
    getFeedbackByTaskId,
    updateFeedbackById,
    deleteFeedbackById,
    getFeedbacksByClientId,
};

export default feedbackController;
