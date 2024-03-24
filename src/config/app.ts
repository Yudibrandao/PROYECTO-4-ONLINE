import express, { Application } from "express";
import cors from "cors"; // Importa cors de esta manera
import dotenv from "dotenv";
import { userController } from './controllers/userController';
import apiRoutes from "./routes/api.routes";
import baseRoutes from "./routes/base.routes";
import { corsOptions } from "./config/cors"; // Asegúrate de importar correctamente tus opciones de cors

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Usa tus opciones de cors aquí

// Routes
app.get('/', baseRoutes);
app.use('/api', apiRoutes);

// user controller
app.get('/api/users', userController.getAll)
app.post('/api/users', userController.create)
app.put('/api/users', userController.update)
app.delete('/api/users', userController.delete)

export default app;
