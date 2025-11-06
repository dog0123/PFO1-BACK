// models/Evento.js
import mongoose from "mongoose";

// 🔹 Estructura de un evento
const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },         // Nombre del evento (por ej: Casamiento de ...)
  fecha: { type: Date, required: true },            // Fecha del evento
  lugar: { type: String, required: true },          // Lugar o salón donde se realiza

  // Relaciones con otros módulos:
  clienteId: {                                      // El cliente que contrata el evento
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
  },

  proveedores: [{                                   // Lista de proveedores involucrados
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proveedor"
  }],

  tareas: [{                                        // Lista de tareas del evento
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tarea"
  }],

  invitados: [{                                     // Lista de invitados
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invitado"
  }],

  presupuestoId: {                                  // Presupuesto asociado
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presupuesto"
  },

  descripcion: { type: String, default: "" },       // Información adicional
  estado: {                                         // Estado general del evento
    type: String,
    enum: ["planificado", "en progreso", "finalizado"],
    default: "planificado"
  }
}, { timestamps: true });

// Exportamos el modelo
export default mongoose.model("Evento", eventoSchema);
