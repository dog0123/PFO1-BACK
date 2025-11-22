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

import { isAuthenticated } from "./index.js";

const router = express.Router();

// VIEWS
router.get("/vista", isAuthenticated, listarClientesView);
router.get("/vista/nuevo", isAuthenticated, mostrarFormularioNuevoCliente);
router.post("/vista", isAuthenticated, crearClienteView);
router.get("/vista/:id", isAuthenticated, verClienteView);
router.get("/vista/:id/editar", isAuthenticated, editarClienteView);
router.put("/vista/:id", isAuthenticated, actualizarClienteView);
router.delete("/vista/:id", isAuthenticated, eliminarClienteView);

// API
router.get("/", listarClientes);
router.get("/:id", obtenerCliente);
router.post("/", crearCliente);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);

export default router;
