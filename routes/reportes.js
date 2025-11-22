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

import { isAuthenticated } from "./index.js";

const router = express.Router();

router.get("/api", obtenerTodosLosReportes);
router.get("/api/:id", obtenerReportePorId);
router.get("/api/evento/:eventoId", obtenerReportePorEvento);
router.put("/api/:id", actualizarReporte);


router.get("/vista", isAuthenticated, listarReportesView);
router.get("/vista/:id", isAuthenticated, verReporteView);
router.get("/vista/:id/editar", isAuthenticated, editarReporteFormView);
router.put("/vista/:id", isAuthenticated, actualizarReporteView);
router.get("/vista/:id/encuesta", isAuthenticated, verFormEncuestaView);
router.post("/vista/:id/encuesta", isAuthenticated, agregarEncuestaView);

export default router;
