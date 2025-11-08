import express from "express";
import {
  crearReporte,
  listarReportes,
  obtenerReportePorId,
  actualizarReporte,
  eliminarReporte
} from "../controllers/reporteController.js";

const router = express.Router();

// Rutas CRUD
router.get("/", listarReportes);
router.get("/:id", obtenerReportePorId);
router.post("/", crearReporte);
router.put("/:id", actualizarReporte);
router.delete("/:id", eliminarReporte);

export default router;
