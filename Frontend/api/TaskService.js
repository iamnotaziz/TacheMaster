import api from "./api";

const getAllTasks = async (token) => {
  try {
    const response = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createTask = async (taskData, token) => {
  try {
    const response = await api.post("/tasks", taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getTaskById = async (id, token) => {
  try {
    const response = await api.get(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateTask = async (id, taskData, token) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const deleteTask = async (id, token) => {
  try {
    const response = await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/*const assignClientToTask = async (taskId, clientId, token) => {
  try {
    const response = await api.post(`/tasks/${taskId}/assign-client`, { clientId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
*/
const getTasksByCommercialId = async (commercialId, token) => {
  try {
    const response = await api.get(`/tasks/commercial/${commercialId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getTasksByClientId = async (clientId, token) => {
  try {
    const response = await api.get(`/tasks/client/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/*const getTaskFeedback = async (taskId, token) => {
  try {
    const response = await api.get(`/tasks/${taskId}/feedback`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};*/

export default {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  //assignClientToTask,
  getTasksByCommercialId,
  getTasksByClientId,
  //getTaskFeedback,
};
