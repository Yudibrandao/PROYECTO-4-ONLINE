import express from 'express';

import userRoutes from './user.routes';
import baseRoutes from './base.routes';
import citaRoutes from './cita.routes';
import authRoutes from './auth.routes';
import tatuadoreRoutes from './tatuadore.routes'

const router = express.Router();

////// API ROUTES

// base routes
router.use('/', baseRoutes);

// users routes
router.use('/users', userRoutes);

// cita routes
router.use('/cita', citaRoutes);

// auth routes
router.use('/auth',authRoutes);

// tatuadore routes
router.use('/tatuadore',tatuadoreRoutes);

export default router;