import express from "express";
import {
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  obtenerTareasPorEvento,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from "../controllers/tareasController.js";

import {
  mostrarTareasVistaView,
  mostrarFormularioNuevaView,
  crearTareaView,
  verTareaView,
  mostrarFormularioEditarView,
  actualizarTareaView,
  eliminarTareaView
} from "../controllers/tareasViewsController.js";

import { isAuthenticated } from "./index.js";

const router = express.Router();

router.get("/vista", isAuthenticated, mostrarTareasVistaView);
router.get("/vista/nueva", isAuthenticated, mostrarFormularioNuevaView);
router.post("/vista", isAuthenticated, crearTareaView);
router.get("/vista/:id", isAuthenticated, verTareaView);
router.get("/vista/:id/editar", isAuthenticated, mostrarFormularioEditarView);
router.put("/vista/:id", isAuthenticated, actualizarTareaView);
router.delete("/vista/:id", isAuthenticated, eliminarTareaView);

router.get("/", obtenerTodasLasTareas);
router.get("/:id", obtenerTareaPorId);
router.get("/:id", obtenerTareasPorEvento);
router.post("/", crearTarea);
router.put("/:id", actualizarTarea);
router.delete("/:id", eliminarTarea);

export default router;
