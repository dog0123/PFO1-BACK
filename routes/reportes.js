// routes/reportesRoutes.js
import express from "express";
import {
  obtenerTodosLosReportes,
  obtenerReportePorId,
  obtenerReportePorEvento,
  actualizarReporte
} from "../controllers/reportesController.js";

import {
  listarReportesView,
  verReporteView,
  editarReporteFormView,
  actualizarReporteView,
  verFormEncuestaView,
  agregarEncuestaView
} from "../controllers/reportesViewsController.js";

const router = express.Router();

router.get("/api", obtenerTodosLosReportes);
router.get("/api/:id", obtenerReportePorId);
router.get("/api/evento/:eventoId", obtenerReportePorEvento);
router.put("/api/:id", actualizarReporte);


router.get("/vista", listarReportesView);
router.get("/vista/:id", verReporteView);
router.get("/vista/:id/editar", editarReporteFormView);
router.put("/vista/:id", actualizarReporteView);
router.get("/vista/:id/encuesta", verFormEncuestaView);
router.post("/vista/:id/encuesta", agregarEncuestaView);

export default router;
