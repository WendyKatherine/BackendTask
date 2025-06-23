//Importar dependencias
import express from 'express';
import connection from './database/connection.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import TaskRoutes from './routes/tasks.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname y __filename en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("API Node TaskList");

connection();

//Creacion servidor NODE
const app = express();
const port = process.env.PORT || 3900;

const allowedOrigins = [
    "https://frontend-task-one-bay.vercel.app",
    "http://localhost:3900"
];

//Configuracion de CORS para aceptar las peticiones del front
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//Decodificar datos desde los formularios para convertirlos en objetos Javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar rutas del aplicativo (módulos)
app.use('/api/task', TaskRoutes);

// Configurar carpeta de archivos estáticos
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar el servidor de Node
app.listen(port, () => {
  console.log("Node Server on port", port);
});

// Middleware global de errores para mostrar detalles
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: err.message || err,
  });
});

export default app;