import express,{Request, Response} from 'express';
import { tatuadorController } from '../controllers/tatuadorController';
import { authorizeMiddleware } from '../middlewares/authorize';
import { authMiddleware } from '../middlewares/authMiddleware';
import { citaController } from '../controllers/citaController';

const router = express.Router();

/////////      tatuadorS ROUTES      //////////////////

// get all tatuadors
router.get('/',authorizeMiddleware(["Tatuador"]),tatuadorController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create tatuador
router.post('/create',authorizeMiddleware(["Admin"]),tatuadorController.create);


//editar citas tatuador
router.put('/tatuador/editarCita/:id', authMiddleware, authorizeMiddleware(["tatuador"]), citaController.updateCitasTatuador); 


export default router;