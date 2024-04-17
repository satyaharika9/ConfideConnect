import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/events";

// get events by creatorId
const getEventsForCreator = async (creatorId) => {
  const response = await axios.get(baseURL+`/filter?creatorId=${creatorId}`);
  return response.data;
}

const eventService = { getEventsForCreator };

export default eventService;