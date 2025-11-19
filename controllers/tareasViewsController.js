import {
  obtenerTodasLasTareasService,
  obtenerTareaPorIdService,
  crearTareaService,
  actualizarTareaService,
  eliminarTareaService
} from "../services/tareaService.js";

import Evento from "../models/Evento.js";

// Mostrar lista de tareas
export const mostrarTareasVistaView = async (req, res) => {
  try {
    const tareas = await obtenerTodasLasTareasService();
    const eventos = await Evento.find({}, "nombre").lean(); // solo nombres

    // Convertimos a diccionario para lookup rápido
    const mapaEventos = {};
    eventos.forEach(e => mapaEventos[e._id] = e.nombre);

    // Adjuntamos el nombre del evento a cada tarea
    const tareasConEvento = tareas.map(t => ({
      ...t,
      eventoNombre: mapaEventos[t.eventoId] || "Sin evento"
    }));

    res.render("tareas", {
      titulo: "Listado de Tareas",
      tareas: tareasConEvento
    });
  } catch (error) {
    console.error("Error al cargar lista de tareas:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mostrar formulario para nueva tarea
export const mostrarFormularioNuevaView = async (req, res) => {
  try {
    const eventos = await Evento.find().lean();

    res.render("tarea_form", {
      titulo: "Nueva Tarea",
      action: "/tareas/vista",
      tarea: {},
      eventos
    });
  } catch (error) {
    console.error("Error al cargar formulario de nueva tarea:", error);
    res.status(500).json({ error: error.message });
  }
};

// Guardar nueva tarea
export const crearTareaView = async (req, res) => {
  try {
    await crearTareaService(req.body);
    res.redirect("/tareas/vista");
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).send("Error al crear tarea");
  }
};

// Ver detalle de una tarea
export const verTareaView = async (req, res) => {
  try {
    const tarea = await obtenerTareaPorIdService(req.params.id);

    if (!tarea) return res.status(404).send("Tarea no encontrada");

    // Buscar el evento asociado (solo para la vista)
    let eventoNombre = "Sin evento";

    if (tarea.eventoId) {
      const evento = await Evento.findById(tarea.eventoId).lean();
      if (evento) eventoNombre = evento.nombre;
    }

    res.render("tareaDetalle", {
      titulo: `Tarea: ${tarea.titulo}`,
      tarea,
      eventoNombre
    });
  } catch (error) {
    console.error("Error al ver tarea:", error);
    res.status(500).send("Error al cargar tarea");
  }
};

// Formulario de edición de tarea
export const mostrarFormularioEditarView = async (req, res) => {
  try {
    const tarea = await obtenerTareaPorIdService(req.params.id);
    const eventos = await Evento.find().lean();

    if (!tarea) return res.status(404).send("Tarea no encontrada");

    res.render("tarea_form", {
      titulo: "Editar Tarea",
      tarea,
      action: `/tareas/vista/${req.params.id}?_method=PUT`,
      eventos
    });
  } catch (error) {
    console.error("Error al cargar edición de tarea:", error);
    res.status(500).send("Error al cargar edición de tarea");
  }
};

// Actualizar tarea
export const actualizarTareaView = async (req, res) => {
  try {
    await actualizarTareaService(req.params.id, req.body);
    res.redirect("/tareas/vista");
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).send("Error al actualizar tarea");
  }
};

// Eliminar tarea
export const eliminarTareaView = async (req, res) => {
  try {
    await eliminarTareaService(req.params.id);
    res.redirect("/tareas/vista");
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).send("Error al eliminar tarea");
  }
};