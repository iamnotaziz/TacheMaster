import apiRequest from "./apiRequest";

const getAllFeedbacks = (token) => apiRequest("get", "/feedback", null, token);
const createFeedback = (feedbackData, token) =>
  apiRequest("post", "/feedback", feedbackData, token);
const getFeedbackById = (id, token) => apiRequest("get", `/feedback/${id}`, null, token);
const updateFeedback = (id, feedbackData, token) =>
  apiRequest("put", `/feedback/${id}`, feedbackData, token);
const deleteFeedback = (id, token) =>
  apiRequest("delete", `/feedback/${id}`, null, token);
const getFeedbackByTaskId = (taskId, token) =>
  apiRequest("get", `/feedback/task/${taskId}`, null, token);
const getFeedbackByClientId = (clientId, token) =>
  apiRequest("get", `/feedback/client/${clientId}`, null, token);

export default {
  getAllFeedbacks,
  createFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
  getFeedbackByTaskId,
  getFeedbackByClientId,
};
