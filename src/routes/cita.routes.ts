import express from 'express';
import { citaController } from '../controllers/citaController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

/////////      CITAS ROUTES      //////////////////

//create cita
router.post('/create',authMiddleware, authorizeMiddleware(["artist"]), citaController.create);

//edit cita
router.put('/:id',authMiddleware, authorizeMiddleware(["artist"]), citaController.update);

//delete cita
router.delete('/:id',authMiddleware, authorizeMiddleware(["client","artist"]), citaController.delete);

//get citas by client
router.get('/client/citas',authMiddleware, authorizeMiddleware(["client"]), citaController.getByLogedClient);

//get citas by artist
router.get('/artist/cita',authMiddleware, authorizeMiddleware(["artist"]), citaController.getByLogedArtist);


//////////////////// PROTECTED ROUTES //////////////////////

//get all citas
router.get('/',authMiddleware,authorizeMiddleware(["admin"]), citaController.getAll);

//get cita by id
router.get('/:id',authMiddleware,authorizeMiddleware(["admin"]), citaController.getById);

export default router;