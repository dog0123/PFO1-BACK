// routes/eventos.js
import express from "express";
import {
  listarEventosView,
  mostrarFormularioNuevoEventoView,
  crearEventoView,
  seleccionarClienteView,
  actualizarClienteEventoView,
  actualizarEventoView,
  verDetalleEventoView,
  mostrarEstadoDeEventoView,
  actualizarEstadoDeEventoView,
  vistaProveedoresEventoView,
  agregarProveedorEventoView,
  quitarProveedorEventoView,
  mostrarInvitadosView,
  agregarInvitadoView,
  eliminarInvitadoView,
  eliminarEventoView
} from "../controllers/eventosViewsController.js";

import {
  crearEvento,
  obtenerEvento,
  obtenerEventoCompleto,
  obtenerEventoConProveedores,
  obtenerEventos,
  actualizarEvento,
  eliminarEvento
} from "../controllers/eventosController.js";

import { isAuthenticated } from "./index.js";

const router = express.Router();

// VISTA HTML (Pug)
router.get("/vista", isAuthenticated, listarEventosView);
router.get("/vista/nuevo", isAuthenticated, mostrarFormularioNuevoEventoView);
router.get("/vista/:id", isAuthenticated, verDetalleEventoView)
router.post("/vista", isAuthenticated, crearEventoView);
router.put("/vista/:id", isAuthenticated, actualizarEventoView);
router.delete("/vista/:id", isAuthenticated, eliminarEventoView)

// Mostrar formulario para seleccionar un nuevo cliente
router.get("/vista/:id/cliente", isAuthenticated, seleccionarClienteView);
router.post("/vista/:id/cliente", isAuthenticated, actualizarClienteEventoView);

// Mostrar estado del evento
router.get("/vista/:id/estado", isAuthenticated, mostrarEstadoDeEventoView)
router.post("/vista/:id/estado", isAuthenticated, actualizarEstadoDeEventoView)

// Mostrar proveedores del evento
router.get("/vista/:id/proveedores", isAuthenticated, vistaProveedoresEventoView);
router.post("/vista/:id/proveedores", isAuthenticated, agregarProveedorEventoView)
router.delete("/vista/:id/proveedores/:proveedorId/:nombreMostrar", isAuthenticated, quitarProveedorEventoView);

// Mostrar los invitados de un evento
router.get("/vista/:id/invitados", isAuthenticated, mostrarInvitadosView);
router.post("/vista/:id/invitados", isAuthenticated, agregarInvitadoView);
router.delete("/vista/:eventoId/invitados/:index", isAuthenticated, eliminarInvitadoView);


// CRUD principal
router.get("/", obtenerEventos);
router.post("/", crearEvento);
router.get("/:id", obtenerEvento);
router.get("/:id/completo", obtenerEventoCompleto);
router.get("/:id/proveedores", obtenerEventoConProveedores);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

export default router;