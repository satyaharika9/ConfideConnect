import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/doctors";

// get doctor by id
const getDoctor = async (doctorId) => {
  const response = await axios.get(baseURL+`/${doctorId}`);
  return response.data;
}

const updateDoctor = async (doctorId, doctor) => {
  const response = await axios.put(baseURL+`/${doctorId}`, doctor);
  return response.data;
}

const doctorService = { getDoctor, updateDoctor};

export default doctorService;