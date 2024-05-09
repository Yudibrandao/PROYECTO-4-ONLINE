import express from 'express';
import { citaController } from '../controllers/citaController'; 
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      CITAS ROUTES      //////////////////

//create cita
router.post('/create', authMiddleware, authorizeMiddleware(["Admin", "Tatuador", "cliente"]), citaController.create); 


//get citas by client
router.get('/cliente/cita', authMiddleware, authorizeMiddleware(["cliente"]), citaController.getByLogedCliente); 

//get citas by tatuador
router.get('/tatuador/cita', authMiddleware, authorizeMiddleware(["tatuador"]), citaController.getByLogedTatuador); 

//lista Citas Admin
router.get('/admin/listaCitas', authMiddleware, authorizeMiddleware(["Admin"]), citaController.getByLogedAdmin); 


//////////////////// PROTECTED ROUTES //////////////////////

//get all citas
router.get('/', authMiddleware, authorizeMiddleware(["Admin"]), citaController.getAll); 

//editar citas cliente
router.put('/cliente/editarCita/:id', authMiddleware, authorizeMiddleware(["cliente"]), citaController.updateCitasCliente); 

//editar citas tatuador
router.put('/tatuador/editarCita/:id', authMiddleware, authorizeMiddleware(["tatuador"]), citaController.updateCitasTatuador); 

//edit cita
router.put('/editarCita/:id', authMiddleware, authorizeMiddleware(["Admin"]), citaController.updateCitasAdmin); 

//delete cita
router.delete('/:id', authMiddleware, authorizeMiddleware(["Cliente", "Tatuador"]), citaController.delete); 

//get cita by id
router.get('/:id', authMiddleware, authorizeMiddleware(["Admin"]), citaController.getById); 

export default router;
