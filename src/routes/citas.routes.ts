import express from 'express';
import { citaController } from '../controllers/citaController'; 
import { de } from '@faker-js/faker';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      CITAS ROUTES      //////////////////

//create cita
router.post('/create', authMiddleware, authorizeMiddleware(["Tatuador"]), citaController.create); 

//edit cita
router.put('/:id', authMiddleware, authorizeMiddleware(["Tatuador"]), citaController.update); 

//delete cita
router.delete('/:id', authMiddleware, authorizeMiddleware(["Cliente", "Tatuador"]), citaController.delete); 

//get citas by client
router.get('/cliente/cita', authMiddleware, authorizeMiddleware(["Cliente"]), citaController.getByLogedCliente); 

//get citas by tatuador
router.get('/tatuador/cita', authMiddleware, authorizeMiddleware(["Tatuador"]), citaController.getByLogedTatuador); 


//////////////////// PROTECTED ROUTES //////////////////////

//get all citas
router.get('/', authMiddleware, authorizeMiddleware(["Admin"]), citaController.getAll); 

//get cita by id
router.get('/:id', authMiddleware, authorizeMiddleware(["Admin"]), citaController.getById); 

export default router;
