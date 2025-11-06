// routes/clientes.js
import express from "express";
import {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from "../controllers/clientesController.js";

const router = express.Router();

// Endpoints CRUD
router.get("/", listarClientes);         // Listado de todos los clientes
router.get("/:id", obtenerCliente);      // Ver un solo cliente por id
router.post("/", crearCliente);          // Crear nuevo
router.put("/:id", actualizarCliente);   // Actualizar
router.delete("/:id", eliminarCliente);  // Eliminar

export default router;
