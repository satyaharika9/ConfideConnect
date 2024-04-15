import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/users";

const createUser = async (newUserInfo) => {
  const response = await axios.post(baseURL, newUserInfo);
  return response.data;
}

const login = async (newUserInfo) => {
  const response = await axios.post(baseURL, newUserInfo);
  return response.data;
}

const userService = { createUser, login };

export default userService;