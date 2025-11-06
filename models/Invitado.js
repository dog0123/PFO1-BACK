// models/Invitado.js
import mongoose from "mongoose";

// Definimos la estructura de como registraremos cada invitado
const invitadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },     // Nombre del invitado
  email: { type: String, required: true },      // Correo de contacto
  telefono: { type: String, default: "" },      // Teléfono (opcional)
  estado: {                                     // Estado de asistencia
    type: String,
    enum: ["pendiente", "confirmado", "asistió"],
    default: "pendiente"
  },
  eventoId: {                                   // Relación con el evento
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evento",
    required: true
  },
  fechaConfirmacion: { type: Date },            // Fecha en la que confirmó
  fechaAsistencia: { type: Date }               // Fecha en la que registró su entrada
}, { timestamps: true });

// Exportamos el modelo
export default mongoose.model("Invitado", invitadoSchema);
