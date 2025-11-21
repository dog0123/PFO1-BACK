// models/Proveedor.js
import mongoose from "mongoose";


const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },    
  servicio: { type: String, required: true },   
  telefono: { type: String, default: "" },     
  email: { type: String, default: "" },         
  direccion: { type: String, default: "" }      
}, { timestamps: true });

// Exportamos el modelo para  usarlo en los controladores
export default mongoose.model("Proveedor", proveedorSchema, "proveedores");
