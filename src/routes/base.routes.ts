import express,{Request, Response} from 'express';
import { authController } from '../controllers/authController';

const router = express.Router();

//////////////////////////////////////////a
router.post('/login',authController.login)

// router.post('/register',authController.register);


export default router;