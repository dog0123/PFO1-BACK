// models/Reporte.js
import mongoose from "mongoose";


const reporteSchema = new mongoose.Schema({
  encabezado: { type: String, default: "Sin reporte" },     
  reporte: { type: String, default: ""},                        // El reporte en si
  encuestasDeSatisfaccion: { type: [Object], default: []},      // Encuestas recibidas de los participantes del evento
  feedbackSupervisorDeEvento: { type: String, default: "" },         // Devolucion del supervisor del evento
  eventoId: {                                                   // El evento del estado
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evento"
      }
}, { timestamps: true });

export default mongoose.model("Reporte", reporteSchema);