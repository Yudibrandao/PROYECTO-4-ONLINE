import express,{Request, Response} from 'express';
import { TatuadorController } from '../controllers/tatuadorController';
import { authorizeMiddleware } from '../middlewares/authorize';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

/////////      tatuadorS ROUTES      //////////////////

// get all tatuadors
router.get('/',authMiddleware,TatuadorController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create tatuador
router.post('/create',authorizeMiddleware(["Admin"]),TatuadorController.create);


export default router;