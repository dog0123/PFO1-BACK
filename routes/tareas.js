import express from "express";
import {
  crearTarea,
  listarTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea
} from "../controllers/tareasController.js";

const router = express.Router();

// muestra Vistas con lista de tareas 
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

//form nueva tarea
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

//guardar tarea nueva
router.post("/vista", async (req, res) => {
  try {
    const Tarea = (await import("../models/Tarea.js")).default;
    await Tarea.create(req.body);
    res.redirect("/tareas/vista");
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).send("Error al crear tarea");
  }
});

//ver tarea en detalle
router.get("/vista/:id", async (req, res) => {
  try {
    const Tarea = (await import("../models/Tarea.js")).default;
    const tarea = await Tarea.findById(req.params.id).lean();

    if (!tarea) return res.status(404).send("Tarea no encontrada");

    res.render("tareaDetalle", { 
      titulo: `Tarea: ${tarea.titulo}`, 
      tarea 
    });
  } catch (error) {
    console.error("Error al ver tarea:", error);
    res.status(500).send("Error al cargar tarea");
  }
});

//editar una tarea
router.get("/:id/editar", async (req, res) => {
  try {
    const Tarea = (await import("../models/Tarea.js")).default;
    const tarea = await Tarea.findById(req.params.id).lean();
    if (!tarea) return res.status(404).send("Tarea no encontrada");
    res.render("tarea_form", { titulo: "Editar Tarea", tarea });
  } catch (error) {
    console.error("Error al cargar edición de tarea:", error);
    res.status(500).send("Error al cargar edición de tarea");
  }
});

//actualizar tarea
router.put("/:id", async (req, res) => {
  try {
    const Tarea = (await import("../models/Tarea.js")).default;
    await Tarea.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/tareas/vista");
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).send("Error al actualizar tarea");
  }
});

//eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    const Tarea = (await import("../models/Tarea.js")).default;
    await Tarea.findByIdAndDelete(req.params.id);
    res.redirect("/tareas/vista");
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).send("Error al eliminar tarea");
  }
});



// Endpoints CRUD API (para Thunder Client)
router.post("/", crearTarea);
router.get("/", listarTareas);
router.get("/:id", obtenerTarea);
router.put("/:id", actualizarTarea);
router.delete("/:id", eliminarTarea);

export default router;
