import apiRequest from "./apiRequest";

const getAllUsers = (token) => apiRequest("get", "/users", null, token);
const createUser = (userData, token = null) =>
  apiRequest("post", "/users", userData, token);
const loginUser = (credentials) => apiRequest("post", "/users/login", credentials);
const getUserById = (id, token) => apiRequest("get", `/users/${id}`, null, token);
const updateUser = (id, userData, token) =>
  apiRequest("put", `/users/${id}`, userData, token);
const deleteUser = (id, token) => apiRequest("delete", `/users/${id}`, null, token);
const changeProfileImage = (id, imageData, token) =>
  apiRequest("put", `/users/profile-image/${id}`, imageData, token);

export default {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeProfileImage,
};
