// models/Cliente.js
import mongoose from "mongoose";

// Definimos cómo será cada cliente en la base de datos
const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },     // Nombre completo de persona o empresa
  email: { type: String, required: true },      // Correo electrónico
  telefono: { type: String, default: "" },      // Teléfono (opcional)
  direccion: { type: String, default: "" },     // Dirección (opcional)
  observaciones: { type: String, default: "" }  // Notas adicionales
}, { timestamps: true });

// Exportamos el modelo
export default mongoose.model("Cliente", clienteSchema);
