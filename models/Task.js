// models/Task.js
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const TaskSchema = Schema(
  {
    //Título y descripción
    title:       { type: String, required: true },
    description: { type: String },

    //Fecha límite
    dueDate:     { type: Date, required: true },

    //Estado tipo kanban
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },

    //Imagen asociada
    image: {
      type: String,
      default: "default_user.png",
    },

    //Tablero al que pertenece la tarea
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },

    //Usuario que creó la tarea (por ahora lo llenas con un id o nombre, luego con User real)
    created_by: {
      type: String,
      required: true,
      // luego puedes cambiarlo a:
      // type: Schema.Types.ObjectId,
      // ref: 'User',
    },
  },
  { timestamps: true } // ya tienes createdAt / updatedAt
);

// Configuración de plugin paginación
TaskSchema.plugin(mongoosePaginate);

export default model('Task', TaskSchema, 'tasks');
