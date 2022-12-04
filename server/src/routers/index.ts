import express from 'express';
import usersRoutes from './userRouters';

const router = express.Router();

router.use('/users', usersRoutes);

export default router;
