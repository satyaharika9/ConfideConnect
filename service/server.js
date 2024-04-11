import express from 'express';
import dotenv from 'dotenv'; // not required once hosted

import initialize from './app/app.js';


dotenv.config(); // not required once hosted

const app = express();
const port = process.env.PORT || 3002;

initialize(app);

app.listen(port, () => {console.log(`Server is running on port ${port}!`)});