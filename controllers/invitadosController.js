// controllers/invitadosController.js
import Invitado from "../models/Invitado.js";

// Mostrar una lista de todos los invitados
export const listarInvitados = async (req, res) => {
  try {
    const invitados = await Invitado.find().populate("eventoId");
    res.status(200).json(invitados);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar invitados", error });
  }
};

// Mostrar una lista de los invitados de un evento específico
export const listarPorEvento = async (req, res) => {
  try {
    const invitados = await Invitado.find({ eventoId: req.params.eventoId });
    res.status(200).json(invitados);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar invitados por evento", error });
  }
};

// Obtener un invitado por ID
export const obtenerInvitado = async (req, res) => {
  try {
    const invitado = await Invitado.findById(req.params.id).populate("eventoId");
    if (!invitado) return res.status(404).json({ mensaje: "Invitado no encontrado" });
    res.status(200).json(invitado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener invitado", error });
  }
};

// Crear nuevo invitado
export const crearInvitado = async (req, res) => {
  try {
    const nuevoInvitado = new Invitado(req.body);
    await nuevoInvitado.save();
    res.status(201).json(nuevoInvitado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear invitado", error });
  }
};

// Actualizar datos del invitado (por ejemplo, si confirma)
export const actualizarInvitado = async (req, res) => {
  try {
    const actualizado = await Invitado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: "Invitado no encontrado" });
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar invitado", error });
  }
};

// Eliminar un invitado
export const eliminarInvitado = async (req, res) => {
  try {
    const eliminado = await Invitado.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Invitado no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar invitado", error });
  }
};

// Confirmar asistencia
export const confirmarAsistencia = async (req, res) => {
  try {
    const invitado = await Invitado.findById(req.params.id);
    if (!invitado) return res.status(404).json({ mensaje: "Invitado no encontrado" });
    invitado.estado = "confirmado";
    invitado.fechaConfirmacion = new Date();
    await invitado.save();
    res.status(200).json({ mensaje: "Asistencia confirmada", invitado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al confirmar asistencia", error });
  }
};

// Registrar entrada el día del evento
export const registrarEntrada = async (req, res) => {
  try {
    const invitado = await Invitado.findById(req.params.id);
    if (!invitado) return res.status(404).json({ mensaje: "Invitado no encontrado" });
    invitado.estado = "asistió";
    invitado.fechaAsistencia = new Date();
    await invitado.save();
    res.status(200).json({ mensaje: "Entrada registrada", invitado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar entrada", error });
  }
};
