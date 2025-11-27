import express from 'express';
import auth from '../middlewares/auth.js';
import {
  createBoard,
  getMyBoards,
  getBoardWithTasks,
} from '../controllers/board.controller.js';

const router = express.Router();

router.post('/', auth, createBoard);
router.get('/', auth, getMyBoards);
router.get('/:id', auth, getBoardWithTasks);

export default router;