import express,{Request, Response} from 'express';
import { TatuadorController } from '../controllers/tatuadorController';

const router = express.Router();

//ARTISTS ROUTES
router.get('/',TatuadorController.getAll);

router.post('/create', TatuadorController.create);



export default router;