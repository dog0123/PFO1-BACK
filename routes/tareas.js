import express from "express";
import {
  crearTarea, listarTareas, obtenerTarea, actualizarTarea, eliminarTarea
} from "../controllers/tareasController.js";

const router = express.Router();

// Endpoints CRUD para tareas
router.post("/", crearTarea);         // Crear tarea
router.get("/", listarTareas);       // Listar tareas
router.get("/:id", obtenerTarea);    // Obtener por id
router.put("/:id", actualizarTarea); // Actualizar
router.delete("/:id", eliminarTarea);// Eliminar

export default router;
