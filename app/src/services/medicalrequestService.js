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

// create MedicalRequest
const createMedicalRequest = async (requestInfo) => {
  const response = await axios.post(baseURL, requestInfo);
  return response.data;
}

// delete MedicalRequest by id
const deleteMedicalRequest = async (medicalRequestId) => {
  const response = await axios.delete(baseURL+`/${medicalRequestId}`);
  return response.data;
}

// update MedicalRequest by id
const updateMedicalRequest = async (medicalRequestId, requestInfo) => {
  const response = await axios.put(baseURL+`/${medicalRequestId}`, requestInfo);
  return response.data;
}

const medicalRequestService = {
  getMedicalRequestsForPatient,
  getMedicalRequestsForDoctor,
  createMedicalRequest,
  deleteMedicalRequest,
  updateMedicalRequest
};

export default medicalRequestService;
