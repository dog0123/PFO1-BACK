import express from "express";
import {
  crearReporte,
  listarReportes,
  obtenerReportePorId,
  actualizarReporte,
  eliminarReporte
} from "../controllers/reporteController.js";

const router = express.Router();

// Listar todos los reportes
router.get("/vista", async (req, res) => {
  try {
    const Reporte = (await import("../models/Reporte.js")).default;
    const reportes = await Reporte.find().populate("eventoId").lean();

    res.render("reportes", {
      titulo: "Lista de Reportes",
      reportes
    });
  } catch (error) {
    console.error("Error al cargar /reportes/vista:", error);
    res.status(500).send("Error al cargar los reportes");
  }
});

// Formulario de creación de reporte (solo eventos sin reporte)
router.get("/vista/nuevo", async (req, res) => {
  try {
    const Reporte = (await import("../models/Reporte.js")).default;
    const Evento = (await import("../models/Evento.js")).default;

    // Filtrado de eventos
    const reportesExistentes = await Reporte.find({ eventoId: { $ne: null } }, "eventoId").lean();
    const eventosConReporte = reportesExistentes.map(r => r.eventoId.toString());
    const eventos = await Evento.find({
      _id: { $nin: eventosConReporte }
    }).lean();

    res.render("reporteForm", {
      titulo: "Nuevo Reporte",
      reporte: {},
      eventos
    });
  } catch (error) {
    console.error("Error al cargar formulario de nuevo reporte:", error);
    res.status(500).send("Error al cargar formulario");
  }
});


// Guardar nuevo reporte
router.post("/vista", async (req, res) => {
  try {
    const Reporte = (await import("../models/Reporte.js")).default;
    await Reporte.create(req.body);
    res.redirect("/reportes/vista");
  } catch (error) {
    console.error("Error al crear reporte:", error);
    res.status(500).send("Error al crear reporte");
  }
});

// Ver detalle de un reporte
router.get("/vista/:id", async (req, res) => {
  try {
    const Reporte = (await import("../models/Reporte.js")).default;
    const reporte = await Reporte.findById(req.params.id)
      .populate("eventoId")
      .lean();

    if (!reporte) return res.status(404).send("Reporte no encontrado");

    res.render("reporteDetalle", {
      titulo: `Reporte: ${reporte.encabezado}`,
      reporte
    });
  } catch (error) {
    console.error("Error al ver reporte:", error);
    res.status(500).send("Error al cargar reporte");
  }
});

// Formulario de edición
router.get("/:id/editar", async (req, res) => {
  try {
    const Reporte = (await import("../models/Reporte.js")).default;
    const Evento = (await import("../models/Evento.js")).default;

    const reporte = await Reporte.findById(req.params.id).lean();
    const eventos = await Evento.find().lean();

    if (!reporte) return res.status(404).send("Reporte no encontrado");

    res.render("reporteForm", {
      titulo: `Editar Reporte: ${reporte.encabezado}`,
      reporte,
      eventos
    });
  } catch (error) {
    console.error("Error al cargar formulario de edición de reporte:", error);
    res.status(500).send("Error al cargar formulario");
  }
});

// Actualizar reporte
router.put("/:id", async (req, res) => {
  try {
    const Reporte = (await import("../models/Reporte.js")).default;
    await Reporte.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/reportes/vista");
  } catch (error) {
    console.error("Error al actualizar reporte:", error);
    res.status(500).send("Error al actualizar reporte");
  }
});

// Eliminar reporte
router.delete("/:id", async (req, res) => {
  try {
    const Reporte = (await import("../models/Reporte.js")).default;
    await Reporte.findByIdAndDelete(req.params.id);
    res.redirect("/reportes/vista");
  } catch (error) {
    console.error("Error al eliminar reporte:", error);
    res.status(500).send("Error al eliminar reporte");
  }
});

// Rutas CRUD
router.get("/", listarReportes);
router.get("/:id", obtenerReportePorId);
router.post("/", crearReporte);
router.put("/:id", actualizarReporte);
router.delete("/:id", eliminarReporte);

export default router;
