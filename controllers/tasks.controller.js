import Task from "../models/Task.js";
import fs from 'node:fs/promises';
import path from 'node:path';


//Metodo de prueba Task
export const testTask = (req, res) => {
    return res.status(200).send({
        message: 'Task test'
    });
};

//Metodo guardar tarea
// Metodo guardar tarea
export const saveTask = async (req, res) => {
  try {
    const {
      title,
      description = "",
      dueDate,
      status,
      created_by,
      boardId,
      image = "default_user.png",
    } = req.body;

    // Validar campos requeridos
    if (!title || !dueDate || !status || !created_by || !boardId) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields (title, dueDate, status, created_by, boardId)",
      });
    }

    const newTask = new Task({
      title,
      description: description || "",
      dueDate,
      status,
      image,
      created_by,
      board: boardId,
    });

    const taskStored = await newTask.save();

    return res.status(201).json({
      status: "created",
      message: "Task registered successfully",
      task: taskStored,
    });

  } catch (error) {
    console.error("❌ Error saving task:", error);

    return res.status(500).json({
      status: "error",
      message: "Error saving task",
    });
  }
};


export const uploadImageTask = async (req, res) => {
    const taskId = req.params.id;

    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    try {
        const imageUrl = req.file.path;
        
        const taskUpdated = await Task.findByIdAndUpdate(
            taskId,
            { image: imageUrl },
            { new: true }
        );

        if (!taskUpdated) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({
            status: 'success',
            task: taskUpdated,
        });

    } catch (err) {
        console.error('❌ Error updating task with image:', err);
        return res.status(500).json({ message: 'Upload error', err });
    }
};


export const getImageFile = async (req, res) => {
    try {
        const file = req.params.image;
        const filePath = path.resolve('uploads', file);

        await fs.access(filePath); // Lanza error si no existe

        return res.sendFile(filePath);
    } catch (err) {
        return res.status(404).json({
        status: 'error',
        message: 'Image not found',
        });
    }
};

//Metodo mostrar Task
export const getTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        //Buscar la Task en la BD
        const task = await Task.findById(taskId);

        //Verificar si la Task no existe
        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            task
        });

    } catch (error) {
        console.log('Error getting task: ', error);
        return res.status(500).send({
            status: 'error',
            message: 'Error getting task'
        });
    }
};

//Metodo para listar tasks
export const listTask = async (req, res) => {
  try {
    const page  = parseInt(req.query.page  ?? '1', 10);
    const limit = parseInt(req.query.limit ?? '8', 10);
    const { boardId } = req.query;

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    // 👇 Filtro por tablero (si viene boardId)
    const filter = {};
    if (boardId) {
      filter.board = boardId;
    }

    const tasks = await Task.paginate(filter, options);

    // 👇 OJO: YA NO HAY 404 POR "NO TASKS"
    return res.status(200).json({
      status: 'success',
      tasks: tasks.docs,
      totalDocs: tasks.totalDocs,
      totalPages: tasks.totalPages,
      currentPage: tasks.page,
    });
  } catch (error) {
    console.error('❌ Error listing tasks:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error listing tasks',
    });
  }
};

export const updateTask = async (req, res) => {
  const { id: taskId } = req.params;

  try {
    const { title, description, dueDate, status, created_by, boardId } = req.body;

    const updates = { title, description, dueDate, status, created_by };

    if (boardId) {
      updates.board = boardId; // 👈 opcional
    }

    Object.keys(updates).forEach(
      key => updates[key] === undefined && delete updates[key]
    );

    const taskUpdated = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
    });

    if (!taskUpdated) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Task updated successfully',
      task: taskUpdated,
    });
  } catch (error) {
    console.error('❌ Error updating task:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error updating task',
    });
  }
};


//Metodo para eliminar task
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskDeleted = await Task.findByIdAndDelete(taskId);

        if (!taskDeleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        }

        // Devolvemos respuesta exitosa
        return res.status(200).json({
            status: "success",
            message: 'Task deleted successfully',
            task: taskDeleted
        });

    } catch (error) {
        console.log(`Error deleting task: ${ error }`);

        return res.status(500).send({
            status: "error",
            message: "Error deleting task"
        });
    }
};