import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect";

// Fetch all users
const getAllUsers = async () => {
  const response = await axios.get(baseURL+'/users');
  return response.data;
}

// Update user
const updateUser = async (user) => {
  const response = await axios.put(baseURL+`/users/${user._id}`, user);
  return response.data;
}

// Delete user
const deleteUser = async (id) => {
  const response = await axios.delete(baseURL+`/users/${id}`);
  return response.data;
}

// Create user
const createUser = async (newUserInfo) => {
  const response = await axios.post(baseURL+'/users', newUserInfo);
  return response.data;
}

// Login
const login = async (newUserInfo) => {
  const response = await axios.post(baseURL+'/users/login', newUserInfo);
  return response.data;
}

// Get user
const getUser = async (authInfo) => {
  const {userId, accessToken} = authInfo;
  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };
  const response = await axios.get(baseURL+`/users/${userId}`, { headers });
  return response.data;
}

// Get user details
const getUserDetails = async (user, authInfo) => {
  const headers = {
    'Authorization': `Bearer ${authInfo.accessToken}`
  };
  const response = await axios.get(baseURL+`/${user.role}s/${user._id}`, { headers });
  return response.data;
}

const getResetToken = async (userInfo) => {
  const response = await axios.post(baseURL+'/users/reset', userInfo);
  return response.data;
}

const resetPassword = async (userInfo, token) => {
  const response = await axios.post(baseURL+`/users/reset/${token}`, userInfo);
  return response.data;
}

const userService = { createUser, login, getUser, getUserDetails, getResetToken, resetPassword };

export default userService;