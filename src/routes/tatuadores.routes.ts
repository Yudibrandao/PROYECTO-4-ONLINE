import express,{Request, Response} from 'express';
import { tatuadorController } from '../controllers/tatuadorController';
import { authorizeMiddleware } from '../middlewares/authorize';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

/////////      tatuadorS ROUTES      //////////////////

// get all tatuadors
router.get('/',authMiddleware,authorizeMiddleware,tatuadorController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create tatuador
router.post('/create',authorizeMiddleware(["Admin"]),tatuadorController.create);


export default router;