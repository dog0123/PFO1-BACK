import {
  obtenerTodasLasTareasService,
  obtenerTareaPorIdService,
  obtenerTareasPorEventoService,
  crearTareaService,
  actualizarTareaService,
  eliminarTareaService
} from "../services/tareaService.js";

// Obtener todas las tareas
export const obtenerTodasLasTareas = async (req, res) => {
  try {
    const tareas = await obtenerTodasLasTareasService();
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ mensaje: "Error al obtener tareas" });
  }
};

// Obtener tarea por ID
export const obtenerTareaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const tarea = await obtenerTareaPorIdService(id);

    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json(tarea);
  } catch (error) {
    console.error("Error al obtener tarea:", error);
    res.status(500).json({ mensaje: "Error al obtener la tarea" });
  }
};

// Obtener tareas por evento
export const obtenerTareasPorEvento = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const tareas = await obtenerTareasPorEventoService(eventoId);

    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas del evento:", error);
    res.status(500).json({ mensaje: "Error al obtener tareas del evento" });
  }
};

// Crear nueva tarea
export const crearTarea = async (req, res) => {
  try {
    const data = req.body;

    const nuevaTarea = await crearTareaService(data);

    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ mensaje: "Error al crear tarea" });
  }
};

// Actualizar tarea
export const actualizarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const cambios = req.body;

    const tareaActualizada = await actualizarTareaService(id, cambios);

    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json(tareaActualizada);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ mensaje: "Error al actualizar tarea" });
  }
};

// Eliminar tarea
export const eliminarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const tareaEliminada = await eliminarTareaService(id);

    if (!tareaEliminada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ mensaje: "Error al eliminar tarea" });
  }
};