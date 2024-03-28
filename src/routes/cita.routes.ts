import express from 'express';
import { CitaController } from '../controllers/citaController'; 
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      CITAS ROUTES      //////////////////

//create cita
router.post('/create', authMiddleware, authorizeMiddleware(["tatuador"]), CitaController.create); 

//edit cita
router.put('/:id', authMiddleware, authorizeMiddleware(["tatuador"]), CitaController.update); 

//delete cita
router.delete('/:id', authMiddleware, authorizeMiddleware(["cliente", "tatuador"]), CitaController.delete); 

//get citas by client
router.get('/cliente/cita', authMiddleware, authorizeMiddleware(["cliente"]), CitaController.getByLogedCliente); 

//get citas by tatuador
router.get('/tatuador/cita', authMiddleware, authorizeMiddleware(["tatuador"]), CitaController.getByLogedTatuador); 


//////////////////// PROTECTED ROUTES //////////////////////

//get all citas
router.get('/', authMiddleware, authorizeMiddleware(["admin"]), CitaController.getAll); 

//get cita by id
router.get('/:id', authMiddleware, authorizeMiddleware(["admin"]), CitaController.getById); 

export default router;
