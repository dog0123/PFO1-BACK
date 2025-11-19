// controllers/reportesControllerView.js
import {
  obtenerTodosLosReportesService,
  obtenerReportePorIdService,
  actualizarReporteService
} from "../services/reporteService.js";

import Evento from "../models/Evento.js";

// Listar todos los reportes
export const listarReportesView = async (req, res) => {
  try {
    const reportes = await obtenerTodosLosReportesService();
    // Para la vista necesitamos popular eventoId
    const reportesConEvento = await Promise.all(
      reportes.map(async (r) => {
        const evento = await Evento.findById(r.eventoId).lean();
        return { ...r, eventoId: evento || null };
      })
    );

    res.render("reportes", {
      titulo: "Lista de Reportes",
      reportes: reportesConEvento
    });
  } catch (error) {
    console.error("Error al cargar lista de reportes:", error);
    res.status(500).send("Error al cargar los reportes");
  }
};

// Ver detalle de un reporte
export const verReporteView = async (req, res) => {
  try {
    const reporte = await obtenerReportePorIdService(req.params.id);

    if (!reporte) return res.status(404).send("Reporte no encontrado");

    const evento = await Evento.findById(reporte.eventoId).lean();

    const origen = req.query.from; // 'listado' o 'evento'
    const volverUrl = origen === 'evento' && evento ? `/eventos/vista/${evento._id}` : '/reportes/vista';

    res.render("reporteDetalle", {
      titulo: `Reporte: ${evento.nombre}`,
      reporte: { ...reporte, eventoId: evento || null },
      volverUrl
    });
  } catch (error) {
    console.error("Error al ver reporte:", error);
    res.status(500).send("Error al cargar reporte");
  }
};

// Formulario de edición
export const editarReporteFormView = async (req, res) => {
  try {
    const reporte = await obtenerReportePorIdService(req.params.id);
    if (!reporte) return res.status(404).send("Reporte no encontrado");

    const eventos = await Evento.find().lean();

    res.render("reporteForm", {
      titulo: `Editar Reporte: ${reporte.encabezado}`,
      reporte,
      eventos
    });
  } catch (error) {
    console.error("Error al cargar formulario de edición:", error);
    res.status(500).send("Error al cargar formulario");
  }
};

// Actualizar reporte
export const actualizarReporteView = async (req, res) => {
  try {
    await actualizarReporteService(req.params.id, req.body);
    res.redirect("/reportes/vista");
  } catch (error) {
    console.error("Error al actualizar reporte:", error);
    res.status(500).send("Error al actualizar reporte");
  }
};

export const verFormEncuestaView = async (req, res) => {
  try {
    const id = req.params.id;
    const reporte = await obtenerReportePorIdService(id);

    if (!reporte) {
      return res.status(404).send("Reporte no encontrado");
    }

    res.render("reporteEncuestas", {
      titulo: "Agregar encuesta de satisfacción",
      reporte
    });

  } catch (error) {
    console.error("Error mostrando form de encuesta:", error);
    res.status(500).send("Error interno del servidor");
  }
};


export const agregarEncuestaView = async (req, res) => {
  try {
    const id = req.params.id;
    const { keys = [], values = [] } = req.body;

    // Construir objeto dinámico
    const encuesta = {};
    keys.forEach((key, i) => {
      encuesta[key] = values[i];
    });

    const reporte = await obtenerReportePorIdService(id);
    if (!reporte) return res.status(404).send("Reporte no encontrado");

    // Asegurar array correcto
    const nuevasEncuestas = Array.isArray(reporte.encuestasDeSatisfaccion)
      ? [...reporte.encuestasDeSatisfaccion, encuesta]
      : [encuesta];

    // Guardar en el campo correcto
    await actualizarReporteService(id, { 
      encuestasDeSatisfaccion: nuevasEncuestas 
    });

    res.redirect(`/reportes/vista/${id}/editar`);
  } catch (error) {
    console.error("Error al agregar encuesta:", error);
    res.status(500).send("Error interno del servidor");
  }
};