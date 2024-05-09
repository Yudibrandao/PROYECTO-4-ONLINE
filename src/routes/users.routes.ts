import express from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';


const router = express.Router();

//////////      PROFILE ROUTES      //////////////////

//get loged user profile  
router.get('/profile/',authMiddleware, userController.getLogedUser);

router.post('/login/', userController.login);


//Update loged user profile
router.put('/profile/update',authMiddleware, userController.updateLogedUser);

//get user by id
router.get('/profile/:id',authMiddleware, userController.getProfileById); 

//get all users
router.get('/all', authMiddleware,authorizeMiddleware(["Admin"]), userController.getAll);

//delete user
router.delete('/delete',authMiddleware, userController.deleteByToken);


///////////     PROTECTED ROUTES    /////////////////////

//editar usuarios Admin
router.put('/admin/editarUsuario/:id', authMiddleware, authorizeMiddleware(["admin"]), userController.updateUserAdmin); 

//Create user
router.post('/create', userController.create);

//edit user role
router.put('/edit/role/:id',authMiddleware,authorizeMiddleware(["Admin"]), userController.editUserRole);

//edit user
router.put('/edit/:id',authMiddleware,authorizeMiddleware(["admin", "cliente"]), userController.update);

// //delete user
// router.delete('/delete/:id',authMiddleware, authorizeMiddleware(["admin", "cliente"]),userController.delete);


export default router;