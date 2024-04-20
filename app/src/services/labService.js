import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/labs";

// get Lab by id
const getLab = async (labId) => {
  const response = await axios.get(baseURL+`/${labId}`);
  return response.data;
}

const updateLab = async (labId, lab) => {
  const response = await axios.put(baseURL+`/${labId}`, lab);
  return response.data;

}

const labService = { getLab, updateLab };

export default labService;