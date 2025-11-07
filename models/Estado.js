// models/Estado.js
import mongoose from "mongoose";

// Definimos el esquema de cómo será cada documneto "Estado"
const estadoSchema = new mongoose.Schema({
  estadoActual: { type: String, default: "Iniciando planificacion" },     // Titulo que representa el estado actual
  descripcion: { type: String, default: "El evento se creo por primera vez. A la espera de detalles de planificación"},   // Detalle del estado, pendientes y demas
  fechaDeterminacion: { type: Date, default: Date.now},      // Fecha en que se determino el estado
  usuario: { type: String, default: "" },         // Usuario quien determino el estado
  historial: { type: [Object], default: [] },      // Historial de cambios del estado
  eventoId: {                                      // El evento del estado
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evento"
    }
}, { timestamps: true });

export default mongoose.model("Estado", estadoSchema);