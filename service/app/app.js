// initialise server

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import initializeRoutes from "./routes/index.js";

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect(process.env.MONGO_CONNECTION);
    // mongoose.connect("mongodb+srv://admin:connect123@confideconnectcluster.purt6ji.mongodb.net/confideconnectdb?retryWrites=true&w=majority&appName=ConfideConnectCluster");
    const db = mongoose.connection;
    db.once('open', function () {
        console.log("Connected to ConfideConnect MongoDB successfully :)");
    });
    initializeRoutes(app);
}

export default initialize;