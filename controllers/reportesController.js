// controllers/reportesController.js
import {
  obtenerTodosLosReportesService,
  obtenerReportePorIdService,
  obtenerReportePorEventoService,
  actualizarReporteService,
} from "../services/reporteService.js";


export const obtenerTodosLosReportes = async (req, res) => {
  try {
    const reportes = await obtenerTodosLosReportesService();
    res.json(reportes);
  } catch (error) {
    console.error("Error al obtener todos los reportes:", error);
    res.status(500).json({ mensaje: "Error al obtener reportes" });
  }
};


export const obtenerReportePorEvento = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const reporte = await obtenerReportePorEventoService(eventoId);

    if (!reporte) {
      return res.status(404).json({ mensaje: "Reporte no encontrado para este evento" });
    }

    res.json(reporte);
  } catch (error) {
    console.error("Error al obtener reporte:", error);
    res.status(500).json({ mensaje: "Error al obtener reporte del evento" });
  }
};


export const obtenerReportePorId = async (req, res) => {
  try {
    const id = req.params.id; // _id del reporte
    const reporte = await obtenerReportePorIdService(id);

    if (!reporte) {
      return res.status(404).json({ mensaje: "Reporte no encontrado" });
    }

    res.json(reporte);
  } catch (error) {
    console.error("Error al obtener reporte por ID:", error);
    res.status(500).json({ mensaje: "Error al obtener reporte" });
  }
};


export const actualizarReporte = async (req, res) => {
  try {
    const id = req.params.id; // id del reporte
    const cambios = req.body;

    const reporteActualizado = await actualizarReporteService(id, cambios);

    if (!reporteActualizado) {
      return res.status(404).json({ mensaje: "Reporte no encontrado" });
    }

    res.json(reporteActualizado);
  } catch (error) {
    console.error("Error al actualizar reporte:", error);
    res.status(500).json({ mensaje: "Error al actualizar reporte" });
  }
};

/*
Estos métodos no se incluyen porque la creación/eliminación del reporte depende del evento:

- crearReporte
- eliminarReporte 

*/
