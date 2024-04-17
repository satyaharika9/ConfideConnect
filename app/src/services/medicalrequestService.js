import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/medicalrequests";

// get MedicalRequests by patientId
const getMedicalRequestsForPatient = async (patientId) => {
  const response = await axios.get(baseURL+`/filter?patientId=${patientId}`);
  return response.data;
}

// get MedicalRequests by doctorId
const getMedicalRequestsForDoctor = async (doctorId) => {
  const response = await axios.get(baseURL+`/filter?doctorId=${doctorId}`);
  return response.data;
}

const medicalRequestService = { getMedicalRequestsForPatient, getMedicalRequestsForDoctor };

export default medicalRequestService;