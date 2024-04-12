import userRouter from './user-routes.js'
import patientRouter from "./patient-route.js";
import medicalRequestRouter from "./medicalrequest-route.js";
import doctorRouter from './doctor-route.js';
import labRequestRouter from './LabRequest-route.js';
import labRouter from './lab-route.js';

const initializeRoutes = (app) =>{
    app.use('/confideconnect/users', userRouter);
    app.use('/confideconnect/patients', patientRouter);
    app.use('/confideconnect/medicalrequests', medicalRequestRouter);
    app.use('/confideconnect/doctors', doctorRouter);
    app.use('/confideconnect/labs', labRouter);
    app.use('/confideconnect/labrequests', labRequestRouter);
}

export default initializeRoutes;