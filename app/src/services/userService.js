import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect";

const createUser = async (newUserInfo) => {
  const response = await axios.post(baseURL+'/users', newUserInfo);
  return response.data;
}

const login = async (newUserInfo) => {
  const response = await axios.post(baseURL+'/users/login', newUserInfo);
  return response.data;
}

const getUser = async (authInfo) => {
  const {userId, accessToken} = authInfo;
  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };
  const response = await axios.get(baseURL+`/users/${userId}`, { headers });
  return response.data;
}

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