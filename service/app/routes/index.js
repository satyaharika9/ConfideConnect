import userRouter from './user-routes.js'
import patientRouter from "./patient-route.js";
import medicalRequestRouter from "./medicalrequest-route.js";


const initializeRoutes = (app) =>{
    app.use('/confideconnect/users', userRouter);
    app.use('/confideconnect/patients', patientRouter);
    app.use('/confideconnect/medicalrequests', medicalRequestRouter);
}

export default initializeRoutes;