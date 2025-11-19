// services/reportesService.js
import Reporte from "../models/Reporte.js";

// Obtener todos los reportes
export const obtenerTodosLosReportesService = async () => {
  return await Reporte.find().lean();
};

// Obtener reporte por ID
export const obtenerReportePorIdService = async (id) => {
  return await Reporte.findById(id).lean();
};

// Obtener reporte por evento
export const obtenerReportePorEventoService = async (eventoId) => {
  return await Reporte.findOne({ eventoId }).lean();
};

// Crear reporte inicial (solo se usa al crear un evento)
export const crearReporteInicialService = async (eventoId) => {
  return await Reporte.create({ eventoId });
};

// Actualizar un reporte existente
export const actualizarReporteService = async (id, cambios) => {
  return await Reporte.findByIdAndUpdate(id, cambios, { new: true });
};

// Eliminar un reporte
export const eliminarReporteService = async (id) => {
  return await Reporte.findByIdAndDelete(id);
};
