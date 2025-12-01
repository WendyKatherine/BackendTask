import express from 'express';
import connection from './database/connection.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import TaskRoutes from './routes/tasks.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import boardRoutes from './routes/board.js';

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("API Node TaskList");

connection();

const app = express();
const port = process.env.PORT || 3900;

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Rutas
app.use('/api/task', TaskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/board', boardRoutes);

app.listen(port, () => {
  console.log("Node Server on port", port);
});

app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: err.message || err,
  });
});

export default app;
