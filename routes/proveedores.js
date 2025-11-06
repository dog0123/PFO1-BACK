// routes/proveedores.js
import express from "express";
import {
  listarProveedores,
  obtenerProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../controllers/proveedoresController.js";

const router = express.Router();

// Endpoints CRUD
router.get("/", listarProveedores);         // Mostrar todos
router.get("/:id", obtenerProveedor);       // Buscar un proveedor por id
router.post("/", crearProveedor);           // Crear nuevo proveedor
router.put("/:id", actualizarProveedor);    // Actualizar registro
router.delete("/:id", eliminarProveedor);   // Eliminar registro

export default router;

