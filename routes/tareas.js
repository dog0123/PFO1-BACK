import express from "express";
import {
  crearTarea,
  listarTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea
} from "../controllers/tareasController.js";

const router = express.Router();

// Vistas HTML con Pug 
router.get("/vista", async (req, res) => {
  try {
    const Tarea = (await import("../models/Tarea.js")).default;
    const tareas = await Tarea.find().lean();
    res.render("tareas", { titulo: "Listado de Tareas", tareas });
  } catch (error) {
    console.error("Error al cargar /tareas/vista:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/nueva", (req, res) => {
  try {
    res.render("tarea_form", {
      titulo: "Nueva Tarea",
      action: "/tareas",
      tarea: {}
    });
  } catch (error) {
    console.error("Error al cargar /tareas/nueva:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoints CRUD API (para Thunder Client)
router.post("/", crearTarea);
router.get("/", listarTareas);
router.get("/:id", obtenerTarea);
router.put("/:id", actualizarTarea);
router.delete("/:id", eliminarTarea);

export default router;
