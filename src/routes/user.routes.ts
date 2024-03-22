import express from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

//////////      PROFILE ROUTES      //////////////////



//get all users: api/users/all
router.get('/all', authMiddleware, userController.getAll);

//crear usuario: api/users/create
router.post('/create', userController.create);

//editar usuario : api/users/edit/:id
router.put('/edit/:id',authMiddleware ,userController.update);

//delete user: api/users/delete/:id
router.delete('/delete/:id',authMiddleware, userController.delete);

//get loged user profile: api/users/profile
router.get('/profile/',authMiddleware, userController.getLogedUser);

//Update loged user profile: api/users/profile/update
router.put('/profile/update',authMiddleware, userController.updateLogedUser);


//get user id: api/users/:id
router.get('/:id', authMiddleware, userController.getProfileById);

///////////     PROTECTED ROUTES    /////////////////////

//edit user role
router.put('/edit/role/:id',authMiddleware,authorizeMiddleware(["Admin"]), userController.editUserRole);

//get all users
router.get('/all', authMiddleware,authorizeMiddleware(["Admin"]), userController.getAll);

//Create user
router.post('/create',authMiddleware,authorizeMiddleware(["Admin"]), userController.create);

//edit user
router.put('/edit/:id',authMiddleware,authorizeMiddleware(["Admin"]), userController.update);

//delete user
router.delete('/delete/:id',authMiddleware, authorizeMiddleware(["Admin"]),userController.delete);


export default router;