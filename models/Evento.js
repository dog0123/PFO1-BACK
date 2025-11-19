// models/Evento.js
import mongoose from "mongoose";

// Estructura de un evento
const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },         // Nombre del evento (por ej: Casamiento de ...)
  fecha: { type: Date, required: true },            // Fecha del evento
  lugar: { type: String, required: true },          // Lugar o salón donde se realiza

  // Relaciones con otros módulos:
  clienteId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Cliente",
  required: false
},
clienteBackup: {
  nombre: { type: String, default: "" },
  telefono: { type: String, default: "" },
  email: { type: String, default: "" },
},

  proveedores: [
  {
    proveedorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proveedor",
      default: null
    },
    nombre: { type: String, default: "" },
    servicio: { type: String, default: "" },
    telefono: { type: String, default: "" },
    email: { type: String, default: "" },
    direccion: { type: String, default: "" },
    eliminado: { type: Boolean, default: false },
    eliminadoEn: { type: Date, default: null }
  }
],
  invitados: [{
      nombre: { type: String, required: true },
      contacto: { type: String, default: "" }
    }],

  presupuestoId: {                                  // Presupuesto asociado
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presupuesto"
  },

  estadoId: {                                       // Estado
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado"
  },

  reporteId: {                                      // Reporte
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reporte"
  }
});

// Exportamos el modelo
export default mongoose.model("Evento", eventoSchema);
