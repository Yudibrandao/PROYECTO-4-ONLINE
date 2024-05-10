import express from 'express';

import usersRoutes from './users.routes';
import baseRoutes from './base.routes';
import citasRoutes from './citas.routes';
import authRoutes from './auth.routes';
import tatuadoresRoutes from './tatuadores.routes'

const router = express.Router();

////// API ROUTES

// users routes
router.use('/users', usersRoutes);

// citas routes
router.use('/citas', citasRoutes);

// auth routes
router.use('/auth',authRoutes);

// tatuadores routes
router.use('/tatuadores',tatuadoresRoutes);

export default router;