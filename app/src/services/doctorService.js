import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/doctors";

// Fetch all doctors
const getDoctors = async () => {
  const response = await axios.get(baseURL);
  return response.data;
}

// get doctor by id
const getDoctor = async (doctorId) => {
  const response = await axios.get(baseURL+`/${doctorId}`);
  return response.data;
}

// update doctor
const updateDoctor = async (doctorId, doctor) => {
  const response = await axios.put(baseURL+`/${doctorId}`, doctor);
  return response.data;
}

const doctorService = { getDoctor, updateDoctor, getDoctors};

export default doctorService;