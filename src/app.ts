import express, { Application } from 'express';
import cors from "cors"; 
import { corsOptions } from './config/cors';


const app: Application = express();

app.use(express.json());
app.use(cors(corsOptions));


export default app;
