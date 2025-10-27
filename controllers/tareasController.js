// controllers/tareasController.js
import Tarea from "../models/Tarea.js";

// Crear una nueva tarea
export const crearTarea = async (req, res) => {
  try {
    const tarea = new Tarea(req.body); // espera el body con titulo, eventoId, etc.
    await tarea.save();
    res.status(201).json(tarea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todas las tareas (opcional: filter por evento, event=...)
export const listarTareas = async (req, res) => {
  try {
    const { event } = req.query;
    const filtro = event ? { eventoId: event } : {};
    const tareas = await Tarea.find(filtro).populate("eventoId"); // populate solo si Evento está en Mongo
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una tarea por id
export const obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id).populate("eventoId");
    if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });
    res.json(tarea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar tarea
export const actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tarea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar tarea
export const eliminarTarea = async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ msg: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
