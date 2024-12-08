import apiRequest from "./apiRequest";

const getAllTasks = (token) => apiRequest("get", "/tasks", null, token);
const createTask = (taskData, token) =>
  apiRequest("post", "/tasks", taskData, token);
const getTaskById = (id, token) => apiRequest("get", `/tasks/${id}`, null, token);
const updateTask = (id, taskData, token) =>
  apiRequest("put", `/tasks/${id}`, taskData, token);
const deleteTask = (id, token) => apiRequest("delete", `/tasks/${id}`, null, token);
const getTasksByCommercialId = (commercialId, token) =>
  apiRequest("get", `/tasks/commercial/${commercialId}`, null, token);
const getTasksByClientId = (clientId, token) =>
  apiRequest("get", `/tasks/client/${clientId}`, null, token);

export default {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByCommercialId,
  getTasksByClientId,
};
