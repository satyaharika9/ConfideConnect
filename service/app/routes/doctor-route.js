
import express from "express";
import * as doctorController from '../controllers/doctor-controllers.js';

const doctorRouter = express.Router();

doctorRouter.route('/')
    .get(doctorController.search)
    .delete(doctorController.deleteAllDoctors)
    .post(doctorController.post); 

    doctorRouter.route('/:doctorId')
    .get(doctorController.get) 
    .put(doctorController.put)
    .delete(doctorController.del);

    doctorRouter.route('/filterD')
    .get(doctorController.filterDoctors);

   // doctorRouter.delete('/', doctorRouter.deleteAllDoctors);

    
    export default doctorRouter;