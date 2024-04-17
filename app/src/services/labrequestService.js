import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/labrequests";

// get LabRequest by patientId
const getLabRequestsForPatient = async (patientId) => {
  const response = await axios.get(baseURL+`/filter?patientId=${patientId}`);
  return response.data;
}

// get LabRequest by labId
const getLabRequestsForLab = async (patientId) => {
  const response = await axios.get(baseURL+`/filter?labId=${patientId}`);
  return response.data;
}

const labRequestService = { getLabRequestsForPatient, getLabRequestsForLab };

export default labRequestService;