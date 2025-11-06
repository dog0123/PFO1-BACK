// routes/presupuestos.js
import express from "express";
import {
  listarPresupuestos,
  obtenerPresupuesto,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto
} from "../controllers/presupuestosController.js";

const router = express.Router();

// CRUD principal
router.get("/", listarPresupuestos);        // Listar todos los presupuestos
router.get("/:id", obtenerPresupuesto);     // Buscar por ID
router.post("/", crearPresupuesto);         // Crear nuevo
router.put("/:id", actualizarPresupuesto);  // Actualizar existente
router.delete("/:id", eliminarPresupuesto); // Eliminar

export default router;
