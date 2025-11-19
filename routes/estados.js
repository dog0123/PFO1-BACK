import express from "express";
import {
  obtenerEstadoPorEvento,
  actualizarEstado
} from "../controllers/estadosController.js";
import {
  mostrarEstadoEventoView,
  actualizarEstadoEventoView
} from "../controllers/estadosViewsController.js";

const router = express.Router();

router.get("/:eventoId/vista", mostrarEstadoEventoView);
router.post("/:eventoId/vista", actualizarEstadoEventoView);
router.get("/:id", obtenerEstadoPorEvento);
router.put("/:id", actualizarEstado);

export default router;