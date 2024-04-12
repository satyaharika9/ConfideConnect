import express from 'express';
import * as eventController from '../controllers/event-controller.js'

const eventRouter = express.Router();

eventRouter.route('/')
.get(eventController.getAllEvents)      
.post(eventController.createEvent)       
.delete(eventController.deleteAllEvents); 


eventRouter.route('/:id')
.put(eventController.updateEvent)       
.delete(eventController.deleteEvent);  

eventRouter.route('/filter')
.get( eventController.filterEvent); 

export default eventRouter;