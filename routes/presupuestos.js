import express from "express";

import {
  obtenerTodosLosPresupuestos,
  obtenerPresupuestoId,
  obtenerPresupuestoEvento,
  actualizarPresupuesto
} from "../controllers/presupuestosController.js";

import {
  vistaListarPresupuestos,
  vistaDetallePresupuesto,
  vistaEditarPresupuesto,
  vistaActualizarPresupuesto,
  vistaEliminarItem,
  vistaAgregarItem
} from "../controllers/presupuestosViewsController.js";

import { isAuthenticated } from "./index.js";

const router = express.Router();

router.get("/vista", isAuthenticated, vistaListarPresupuestos);
router.get("/vista/:id", isAuthenticated, vistaDetallePresupuesto);
router.get("/:id/editar", isAuthenticated, vistaEditarPresupuesto);
router.put("/:id", isAuthenticated, vistaActualizarPresupuesto);
router.delete("/:presupuestoId/items/:index", isAuthenticated, vistaEliminarItem);
router.post("/:id/items", isAuthenticated, vistaAgregarItem);

router.get("/",   obtenerTodosLosPresupuestos);  
router.get("/:id", obtenerPresupuestoId);
router.get("/:id", obtenerPresupuestoEvento);
router.put("/:id", actualizarPresupuesto);

export default router;
