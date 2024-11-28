import api from "./api";

const getAllFeedbacks = async (token) => {
  try {
    const response = await api.get("/feedback", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createFeedback = async (feedbackData, token) => {
  try {
    const response = await api.post("/feedback", feedbackData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getFeedbackById = async (id, token) => {
  try {
    const response = await api.get(`/feedback/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateFeedback = async (id, feedbackData, token) => {
  try {
    const response = await api.put(`/feedback/${id}`, feedbackData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const deleteFeedback = async (id, token) => {
  try {
    const response = await api.delete(`/feedback/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getFeedbackByTaskId = async (taskId, token) => {
  try {
    const response = await api.get(`/feedback/task/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getFeedbackByClientId = async (clientId, token) => {
  try {
    const response = await api.get(`/feedback/client/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getAllFeedbacks,
  createFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
  getFeedbackByTaskId,
  getFeedbackByClientId,
};
