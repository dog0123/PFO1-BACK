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

const router = express.Router();

// VISTA HTML (Pug)
router.get("/vista", listarEventosView);
router.get("/vista/nuevo", mostrarFormularioNuevoEventoView);
router.get("/vista/:id", verDetalleEventoView)
router.post("/vista", crearEventoView);
router.put("/vista/:id", actualizarEventoView);
router.delete("/vista/:id", eliminarEventoView)

// Mostrar formulario para seleccionar un nuevo cliente
router.get("/vista/:id/cliente", seleccionarClienteView);
router.post("/vista/:id/cliente", actualizarClienteEventoView);

// Mostrar estado del evento
router.get("/vista/:id/estado", mostrarEstadoDeEventoView)
router.post("/vista/:id/estado", actualizarEstadoDeEventoView)

// Mostrar proveedores del evento
router.get("/vista/:id/proveedores", vistaProveedoresEventoView);
router.post("/vista/:id/proveedores", agregarProveedorEventoView)
router.delete("/vista/:id/proveedores/:proveedorId/:nombreMostrar", quitarProveedorEventoView);

// Mostrar los invitados de un evento
router.get("/vista/:id/invitados", mostrarInvitadosView);
router.post("/vista/:id/invitados", agregarInvitadoView);
router.delete("/vista/:eventoId/invitados/:index", eliminarInvitadoView);


// CRUD principal
router.get("/", obtenerEventos);
router.post("/", crearEvento);
router.get("/:id", obtenerEvento);
router.get("/:id/completo", obtenerEventoCompleto);
router.get("/:id/proveedores", obtenerEventoConProveedores);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

export default router;