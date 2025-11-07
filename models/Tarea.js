// Modelo  Mongoose para tareas del proyecto Eventify

import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, default: "" },
  estado: {
    type: String,
    enum: ["pendiente", "en progreso", "completada"],
    default: "pendiente"
  },
  responsable: { type: String }, // acá se puede guardar el nombre o id del usuario
  fechaInicio: { type: Date },
  fechaFin: { type: Date },
  eventoId: { type: mongoose.Schema.Types.ObjectId, ref: "Evento", required: true }
}, {
  timestamps: true // createdAt, updatedAt automáticos
});

export default mongoose.model("Tarea", tareaSchema);
