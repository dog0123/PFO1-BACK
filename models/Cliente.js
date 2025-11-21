// models/Cliente.js
import mongoose from "mongoose";

// cliente en la bd
const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },     
  email: { type: String, required: true },      
  telefono: { type: String, default: "" },      
  direccion: { type: String, default: "" },     
  observaciones: { type: String, default: "" }  
}, { timestamps: true });


export default mongoose.model("Cliente", clienteSchema);
