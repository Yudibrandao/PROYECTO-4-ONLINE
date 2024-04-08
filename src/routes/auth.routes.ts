import express,{Request, Response} from 'express';
import { authController } from '../controllers/authController';

const router = express.Router();

//////////////////////////////////////////

//login
router.post('/login',authController.login)

//register
router.post('/register',authController.register);


export default router;