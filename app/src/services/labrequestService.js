import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/labrequests";

// get LabRequest by patientId
const getLabRequestsForPatient = async (patientId) => {
  const response = await axios.get(baseURL+`/filter?patientId=${patientId}`);
  return response.data;
}

// get LabRequest by labId
const getLabRequestsForLab = async (labId) => {
  const response = await axios.get(baseURL+`/filter?labId=${labId}`);
  return response.data;
}

// create LabRequest
const createLabRequest= async (requestInfo) => {
  const response = await axios.post(baseURL, requestInfo);
  return response.data;
}

// delete LabRequest by id
const deleteLabRequest = async (labRequestId) => {
  const response = await axios.delete(baseURL+`/${labRequestId}`);
  return response.data;
}

const labRequestService = {
  getLabRequestsForPatient,
  getLabRequestsForLab,
  createLabRequest,
  deleteLabRequest
};

export default labRequestService;