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

const router = express.Router();

router.get("/vista", mostrarTareasVistaView);
router.get("/vista/nueva", mostrarFormularioNuevaView);
router.post("/vista", crearTareaView);
router.get("/vista/:id", verTareaView);
router.get("/vista/:id/editar", mostrarFormularioEditarView);
router.put("/vista/:id", actualizarTareaView);
router.delete("/vista/:id", eliminarTareaView);

router.get("/", obtenerTodasLasTareas);
router.get("/:id", obtenerTareaPorId);
router.get("/:id", obtenerTareasPorEvento);
router.post("/", crearTarea);
router.put("/:id", actualizarTarea);
router.delete("/:id", eliminarTarea);

export default router;
