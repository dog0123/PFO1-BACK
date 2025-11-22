import express from "express";
import {
  obtenerEstadoPorEvento,
  actualizarEstado
} from "../controllers/estadosController.js";
import {
  mostrarEstadoEventoView,
  actualizarEstadoEventoView
} from "../controllers/estadosViewsController.js";

import { isAuthenticated } from "./index.js";

const router = express.Router();

router.get("/:eventoId/vista", isAuthenticated, mostrarEstadoEventoView);
router.post("/:eventoId/vista", isAuthenticated, actualizarEstadoEventoView);
router.get("/:id", obtenerEstadoPorEvento);
router.put("/:id", actualizarEstado);

export default router;