// models/Proveedor.js
import mongoose from "mongoose";

// Definimos el esquema de cómo será cada documneto "Proveedor"
const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },     // Nombre del proveedor 
  servicio: { type: String, required: true },   // Qué servicio brinda (ej: "catering", "música", "fotografía")
  telefono: { type: String, default: "" },      // Teléfono de contacto (opcional)
  email: { type: String, default: "" },         // Correo de contacto (opcional)
  direccion: { type: String, default: "" }      // Dirección física (opcional)
}, { timestamps: true });

// Exportamos el modelo "Proveedor" para poder usarlo en los controladores
export default mongoose.model("Proveedor", proveedorSchema);
