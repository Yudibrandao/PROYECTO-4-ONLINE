import express from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();


//////////      PROFILE ROUTES      //////////////////

//get loged user profile
router.get('/profile/',authMiddleware, userController.getLogedUser);

//Update loged user profile
router.put('/profile/update',authMiddleware, userController.updateLogedUser);


//get user by id
router.get('/:id', authMiddleware, authorizeMiddleware(["Tatuador","Cliente"]), userController.getProfileById);


///////////     PROTECTED ROUTES    /////////////////////

//edit user role
router.put('/edit/role/:id',authMiddleware,authorizeMiddleware(["Admin"]), userController.editUserRole);

//get all users
router.get('/all', authMiddleware,authorizeMiddleware(["Admin"]), userController.getAll);

//Create user
router.post('/create', userController.create);

//edit user
router.put('/edit/:id',authMiddleware,authorizeMiddleware(["Admin"]), userController.update);

//delete user
router.delete('/delete/:id',authMiddleware, authorizeMiddleware(["Admin"]),userController.delete);


export default router;