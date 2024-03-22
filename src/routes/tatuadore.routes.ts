import express,{Request, Response} from 'express';
import { tatuadorController } from '../controllers/tatuadorController';

const router = express.Router();

//ARTISTS ROUTES
router.get('/',tatuadorController.getAll);

router.post('/create', tatuadorController.create);



export default router;