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

const router = express.Router();

router.get("/vista", vistaListarPresupuestos);
router.get("/vista/:id", vistaDetallePresupuesto);
router.get("/:id/editar", vistaEditarPresupuesto);
router.put("/:id", vistaActualizarPresupuesto);
router.delete("/:presupuestoId/items/:index", vistaEliminarItem);
router.post("/:id/items", vistaAgregarItem);

router.get("/",   obtenerTodosLosPresupuestos);  
router.get("/:id", obtenerPresupuestoId);
router.get("/:id", obtenerPresupuestoEvento);
router.put("/:id", actualizarPresupuesto);

export default router;
