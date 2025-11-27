import Board from '../models/Board.js';
import Task from '../models/Task.js';

export const createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;

    const board = await Board.create({
      name,
      description,
      owner: req.user.id,
      members: [req.user.id],
    });

    return res.status(201).json(board);
  } catch (err) {
    console.error('❌ Error al crear tablero:', err);
    return res.status(500).json({ message: 'Error al crear tablero' });
  }
};

export const getMyBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    }).sort({ createdAt: -1 });

    return res.json(boards);
  } catch (err) {
    console.error('❌ Error al obtener tableros:', err);
    return res.status(500).json({ message: 'Error al obtener tableros' });
  }
};

export const getBoardWithTasks = async (req, res) => {
  try {
    const boardId = req.params.id;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Tablero no encontrado' });
    }

    if (
      board.owner.toString() !== req.user.id &&
      !board.members.map((m) => m.toString()).includes(req.user.id)
    ) {
      return res.status(403).json({ message: 'No tienes acceso a este tablero' });
    }

    const tasks = await Task.find({ board: boardId }).sort({ createdAt: -1 });

    return res.json({ board, tasks });
  } catch (err) {
    console.error('❌ Error al obtener tablero:', err);
    return res.status(500).json({ message: 'Error al obtener tablero' });
  }
};
