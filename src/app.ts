import express, { Application } from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import dotenv from "dotenv";

import { userController } from './controllers/userController';
import apiRoutes from "./routes/api.routes";
import baseRoutes from "./routes/base.routes";


dotenv.config();

const app: Application = express();

//Middleware
app.use(express.json());
app.use(cors(corsOptions)); 

//Routes
app.get('/', baseRoutes); 
app.use('/api', apiRoutes); 

export default app;
