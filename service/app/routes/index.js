import userRouter from './user-routes.js'


const initializeRoutes = (app) =>{
    app.use('/confideconnect/users', userRouter);
}

export default initializeRoutes;