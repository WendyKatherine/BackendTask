<h1>📝 Task List API - Backend</h1>

  <p>Este proyecto es una API RESTful construida con <strong>Node.js</strong>, <strong>Express</strong> y <strong>MongoDB</strong> para gestionar tareas en un tablero tipo kanban.</p>

  <h2>🚀 Tecnologías usadas</h2>
  <ul>
    <li>Node.js</li>
    <li>Express</li>
    <li>MongoDB + Mongoose</li>
    <li>Cloudinary (para gestión de imágenes)</li>
    <li>Multer (para uploads)</li>
    <li>CORS configurado para frontend en Vercel</li>
  </ul>

  <h2>📦 Endpoints principales</h2>

  <div class="endpoint">
    <strong>GET</strong> <code>/api/task/list-tasks</code><br/>
    Retorna todas las tareas disponibles.
  </div>

  <div class="endpoint">
    <strong>POST</strong> <code>/api/task/save-task</code><br/>
    Crea una nueva tarea.
  </div>

  <div class="endpoint">
    <strong>PUT</strong> <code>/api/task/update-task/:id</code><br/>
    Actualiza una tarea por ID.
  </div>

  <div class="endpoint">
    <strong>DELETE</strong> <code>/api/task/delete-task/:id</code><br/>
    Elimina una tarea por ID.
  </div>

  <div class="endpoint">
    <strong>POST</strong> <code>/api/task/upload-image-task/:id</code><br/>
    Sube una imagen y la asocia con una tarea.
  </div>

  <h2>🌍 Despliegue</h2>
  <p>Este backend está desplegado en <strong>Render</strong>:</p>
  <code>https://backendtask-dr2m.onrender.com/api/task</code>

  <h2>🛠️ Cómo ejecutar localmente</h2>
  <ol>
    <li>Clona el repositorio</li>
    <li>Instala dependencias con <code>npm install</code></li>
    <li>Crea un archivo <code>.env</code> con tus variables (MongoDB y Cloudinary)</li>
    <li>Ejecuta <code>npm start</code></li>
    <li>El servidor correrá por defecto en <code>http://localhost:3900</code></li>
  </ol>

  <h2>🔐 Variables de entorno</h2>
  <ul>
    <li><code>MONGODB_URI</code></li>
    <li><code>CLOUDINARY_CLOUD_NAME</code></li>
    <li><code>CLOUDINARY_API_KEY</code></li>
    <li><code>CLOUDINARY_API_SECRET</code></li>
  </ul>

  <h2>✍️ Autora</h2>
  <p><strong>Wendy Katherine Villa</strong> - Ingeniera de Software 👩‍💻</p>
