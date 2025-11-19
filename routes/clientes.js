import express from "express";
import {
  listarClientesView,
  mostrarFormularioNuevoCliente,
  crearClienteView,
  verClienteView,
  editarClienteView,
  actualizarClienteView,
  eliminarClienteView
} from "../controllers/clientesViewsController.js";

import {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from "../controllers/clientesController.js";

const router = express.Router();

// VIEWS
router.get("/vista", listarClientesView);
router.get("/vista/nuevo", mostrarFormularioNuevoCliente);
router.post("/vista", crearClienteView);
router.get("/vista/:id", verClienteView);
router.get("/vista/:id/editar", editarClienteView);
router.put("/vista/:id", actualizarClienteView);
router.delete("/vista/:id", eliminarClienteView);

// API
router.get("/", listarClientes);
router.get("/:id", obtenerCliente);
router.post("/", crearCliente);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);

export default router;
