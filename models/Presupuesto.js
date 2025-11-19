// models/Presupuesto.js
import mongoose from "mongoose";

// Subdocumento para los ítems del presupuesto
const itemSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },          // Qué se paga o que se cobra
  tipo: {                                                 // ingreso o gasto
    type: String,
    enum: ["ingreso", "gasto"],
    required: true
  },
  cantidad: { type: Number, default: 1 },
  precioUnitario: { type: Number, required: true },

});

// Esquema principal del presupuesto
const presupuestoSchema = new mongoose.Schema({
  nombre: { type: String, default: "Nuevo presupuesto" },   // Nombre del presupuesto
  eventoId: {                                              // Relación con el evento
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evento",
    required: true
  },
  fechaEmision: { type: Date, default: Date.now },
  estado: {                                                // Estado del presupuesto
    type: String,
    enum: ["En elaboración", "Aprobado", "Rechazado"],
    default: "En elaboración"
  },
  items: [itemSchema],                                     // Lista de ingresos/gastos
  totalGeneral: { type: Number, default: 0 }               // Calculo automático
}, { timestamps: true });

// Exportar modelo
export default mongoose.model("Presupuesto", presupuestoSchema);
