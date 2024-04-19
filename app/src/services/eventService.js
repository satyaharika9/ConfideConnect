import axios from "axios";


const baseURL = "http://localhost:3002/confideconnect/events";

// get events by creatorId
const getEventsForCreator = async (creatorId) => {
  const response = await axios.get(baseURL+`/filter?creatorId=${creatorId}`);
  return response.data;
}

// create event
const createEvent = async (eventInfo) => {
  const response = await axios.post(baseURL, eventInfo);
  return response.data;
}

// delete event by id
const deleteEvent= async (eventId) => {
  const response = await axios.delete(baseURL+`/${eventId}`);
  return response.data;
}

const eventService = { getEventsForCreator, createEvent, deleteEvent };

export default eventService;