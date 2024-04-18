import axios from "axios";

const baseURL = "http://localhost:3002/confideconnect/patients";

// Fetch all patients
const getPatients = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

// Update patient
const updatePatient = async (id,patient) => {
    const response = await axios.put(`${baseURL}/${id}`, patient);
    return response.data;
}

const getPatientById = async (patientId) => {
    const response = await axios.get(`${baseURL}/${patientId}`);
    return response.data;

}

// Patient service object
const patientService = { getPatients, updatePatient, getPatientById };

export default patientService;
