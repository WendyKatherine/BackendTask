import { Router } from 'express';
import { testTask, saveTask, uploadImageTask, getImageFile, getTask, listTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';
import connectMultiparty from "connect-multiparty";
import upload from "../middlewares/upload.js";

const router = Router();

const multipartMiddleware = connectMultiparty({ uploadDir: "./uploads" });

router.get('/test-task', testTask);
router.post('/save-task', saveTask);
router.post('/upload-image-task/:id', upload.single('image'), uploadImageTask);
router.get('/get-image-task/:image', multipartMiddleware, getImageFile);
router.get('/task-detail/:id', getTask);
router.get('/list-tasks/', listTask);
router.put('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

export default router;