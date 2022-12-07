import express from 'express';
import {
  createUser,
  deleteUser,
  getMultipleUser,
  getSingleUser,
} from '../controllers/userControllers';

const router = express.Router();

router.get('/', getMultipleUser);
router.get('/:id', getSingleUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);

export default router;
