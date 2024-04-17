import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/blogs";

// get blogs by creatorId
const getBlogsForCreator = async (creatorId) => {
  const response = await axios.get(baseURL+`/filter?creatorId=${creatorId}`);
  return response.data;
}

const blogService = { getBlogsForCreator };

export default blogService;