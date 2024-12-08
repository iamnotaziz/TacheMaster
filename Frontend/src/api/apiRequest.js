import api from "./api";

const apiRequest = async (method, url, data = null, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiRequest;
