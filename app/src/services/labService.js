import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/labs";

// get Lab by id
const getLab = async (labId) => {
  const response = await axios.get(baseURL+`/${labId}`);
  return response.data;
}

const labService = { getLab };

export default labService;