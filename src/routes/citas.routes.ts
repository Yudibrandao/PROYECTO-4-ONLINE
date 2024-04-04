import express from 'express';
import { citaController } from '../controllers/citaController'; 
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      CITAS ROUTES      //////////////////

//create cita
router.post('/create', authMiddleware, authorizeMiddleware(["tatuador"]), citaController.create); 

//edit cita
router.put('/:id', authMiddleware, authorizeMiddleware(["tatuador"]), citaController.update); 

//delete cita
router.delete('/:id', authMiddleware, authorizeMiddleware(["cliente", "tatuador"]), citaController.delete); 

//get citas by client
router.get('/cliente/cita', authMiddleware, authorizeMiddleware(["cliente"]), citaController.getByLogedCliente); 

//get citas by tatuador
router.get('/tatuador/cita', authMiddleware, authorizeMiddleware(["tatuador"]), citaController.getByLogedTatuador); 


//////////////////// PROTECTED ROUTES //////////////////////

//get all citas
router.get('/', authMiddleware, authorizeMiddleware(["admin"]), citaController.getAll); 

//get cita by id
router.get('/:id', authMiddleware, authorizeMiddleware(["admin"]), citaController.getById); 

export default router;
