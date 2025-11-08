import express from "express";
import {
  listarEstados,
  obtenerEstadoPorId,
  crearEstado,
  actualizarEstado,
  eliminarEstado
} from "../controllers/estadoController.js";

const router = express.Router();

router.get("/", listarEstados);
router.get("/:id", obtenerEstadoPorId);
router.post("/", crearEstado);
router.put("/:id", actualizarEstado);
router.delete("/:id", eliminarEstado);

export default router;
