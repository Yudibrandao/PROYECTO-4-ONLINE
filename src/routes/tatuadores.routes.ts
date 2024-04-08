import express,{Request, Response} from 'express';
import { tatuadorController } from '../controllers/tatuadorController';
import { authorizeMiddleware } from '../middlewares/authorize';

const router = express.Router();

/////////      tatuadorS ROUTES      //////////////////

// get all tatuadors
router.get('/',authorizeMiddleware(["Tatuador"]),tatuadorController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create tatuador
router.post('/create',authorizeMiddleware(["Admin"]),tatuadorController.create);


export default router;