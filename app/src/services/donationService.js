import axios from 'axios';

const BASE_URL = 'http://localhost:3002/confideconnect';

const donationService = {
    makeDonation: async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/donations`, data);
            return response.data;
        } catch (error) {
            console.error('Error making donation:', error);
            throw error; // Re-throw the error to handle it in the component
        }
    }
};

export default donationService;