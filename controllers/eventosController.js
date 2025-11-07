// controllers/eventoController.js
import Estado from "../models/Estado.js";
import Evento from "../models/Evento.js";

// Obtener todos los eventos (listado general)
export const listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.find()
      .populate("proveedores")
      .populate("tareas")
      .populate("invitados")
      .populate("presupuestoId");
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar eventos", error });
  }
};

// Obtener un evento por ID
export const obtenerEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id)
      .populate("proveedores")
      .populate("tareas")
      .populate("invitados")
      .populate("presupuestoId");
    if (!evento) return res.status(404).json({ mensaje: "Evento no encontrado" });
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener evento", error });
  }
};

// Crear un nuevo evento
export const crearEvento = async (req, res) => {
  try {
    const estadoInicial = new Estado();
    const reporteInicial = new Reporte();
    await estadoInicial.save();
    await reporteInicial.save();

     const nuevoEvento = new Evento({
      ...req.body,
      estadoId: estadoInicial._id,
      reporteId: reporteInicial._id
    });
    await nuevoEvento.save();

    reporteInicial.eventoId = nuevoEvento._id;
    estadoInicial.eventoId = nuevoEvento._id;
    await estadoInicial.save();
    await reporteInicial.save();

    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear evento", error });
  }
};

// Actualizar un evento existente
export const actualizarEvento = async (req, res) => {
  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!eventoActualizado) return res.status(404).json({ mensaje: "Evento no encontrado" });
    res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar evento", error });
  }
};

// Eliminar un evento
export const eliminarEvento = async (req, res) => {
  try {
    const eliminado = await Evento.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Evento no encontrado" });
    res.status(204).send(); // Sin contenido
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar evento", error });
  }
};

// Obtener todas las tareas de un evento 
export const obtenerTareasPorEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate("tareas");
    if (!evento) return res.status(404).json({ mensaje: "Evento no encontrado" });
    res.status(200).json(evento.tareas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tareas del evento", error });
  }
};
