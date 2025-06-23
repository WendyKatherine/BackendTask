import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const TaskSchema = Schema ({
        task_id: {
            type: Schema.ObjectId,
            ref: 'Task',
            require: true
        },
        title:       { type: String, required: true },
        description: { type: String },
        dueDate:     { type: Date },
        status: {
            type: String,
            enum: ['pending', 'in‑progress', 'completed'],
            default: 'pending',
        },
        image: {
            type: String,
            default: "default_user.png"
        },
        created_by: {
            type: String,
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    },
        { timestamps: true }
);

//Configuracion de plugin paginacion
TaskSchema.plugin(mongoosePaginate);
export default model('Task', TaskSchema, 'tasks');