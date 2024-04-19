import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/blogs";

// get blogs by creatorId
const getBlogs = async (creatorId) => {
  const response = await axios.get(baseURL+`/filter?creatorId=${creatorId}`);
  return response.data;
}

// create blog
const createBlog = async (blogInfo) => {
  const response = await axios.post(baseURL, blogInfo);
  return response.data;
}

// delete blog by id
const deleteBlog = async (blogId) => {
  const response = await axios.delete(baseURL+`/${blogId}`);
  return response.data;
}

const blogService = { getBlogs, createBlog, deleteBlog };

export default blogService;