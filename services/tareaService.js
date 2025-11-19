// services/tareaService.js
import Tarea from "../models/Tarea.js";

// Obtener todas las tareas
export const obtenerTodasLasTareasService = async () => {
  return await Tarea.find().lean();
};

// Obtener tarea por _id
export const obtenerTareaPorIdService = async (id) => {
  return await Tarea.findById(id).lean();
};

// Obtener tareas por evento
export const obtenerTareasPorEventoService = async (eventoId) => {
  return await Tarea.find({ eventoId }).lean();
};

// Crear nueva tarea
export const crearTareaService = async (data) => {
  return await Tarea.create(data);
};

// Actualizar tarea existente
export const actualizarTareaService = async (id, cambios) => {
  return await Tarea.findByIdAndUpdate(id, cambios, { new: true }).lean();
};

// Eliminar tarea
export const eliminarTareaService = async (id) => {
  return await Tarea.findByIdAndDelete(id).lean();
};
