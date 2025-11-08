import mongoose from "mongoose";
import Reporte from "../models/Reporte.js";

// Crear un nuevo reporte
export const crearReporte = async (req, res) => {
  try {
    const nuevoReporte = new Reporte(req.body);
    const reporteGuardado = await nuevoReporte.save();
    res.status(201).json(reporteGuardado);
  } catch (error) {
    console.error("Error al crear el reporte:", error);
    res.status(500).json({ error: "Error al crear el reporte" });
  }
};

// Lista de todos los reportes
export const listarReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find()
      .populate("eventoId")
      .lean();
    res.status(200).json(reportes);
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    res.status(500).json({ error: "Error al obtener reportes" });
  }
};

// Obtener un reporte por ID
export const obtenerReportePorId = async (req, res) => {
  try {
    const reporte = await Reporte.findById(req.params.id)
      .populate("eventoId")
      .lean();

    if (!reporte) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    res.status(200).json(reporte);
  } catch (error) {
    console.error("Error al obtener reporte por ID:", error);
    res.status(500).json({ error: "Error al obtener el reporte" });
  }
};

// Actualizar un reporte
export const actualizarReporte = async (req, res) => {
  try {
    const reporteActualizado = await Reporte.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!reporteActualizado) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    res.status(200).json(reporteActualizado);
  } catch (error) {
    console.error("Error al actualizar el reporte:", error);
    res.status(500).json({ error: "Error al actualizar el reporte" });
  }
};

// Eliminar un reporte
export const eliminarReporte = async (req, res) => {
  try {
    const reporteEliminado = await Reporte.findByIdAndDelete(req.params.id);
    if (!reporteEliminado) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
    res.status(200).json({ mensaje: "Reporte eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el reporte:", error);
    res.status(500).json({ error: "Error al eliminar el reporte" });
  }
};
