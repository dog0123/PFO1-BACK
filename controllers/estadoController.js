import Estado from "../models/Estado.js";

// Lista de todos los estados
export const listarEstados = async (req, res) => {
  try {
    const estados = await Estado.find().populate("eventoId");
    res.json(estados);
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    res.status(500).json({ message: "Error al obtener los estados" });
  }
};

// Obtener un estado por ID
export const obtenerEstadoPorId = async (req, res) => {
  try {
    const estado = await Estado.findById(req.params.id).populate("eventoId");
    if (!estado) return res.status(404).json({ message: "Estado no encontrado" });
    res.json(estado);
  } catch (error) {
    console.error("Error al obtener el estado:", error);
    res.status(500).json({ message: "Error al obtener el estado" });
  }
};

// Crear un nuevo estado
export const crearEstado = async (req, res) => {
  try {
    const nuevoEstado = new Estado(req.body);
    const guardado = await nuevoEstado.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error("Error al crear el estado:", error);
    res.status(400).json({ message: "Error al crear el estado" });
  }
};

// Actualizar un estado existente
export const actualizarEstado = async (req, res) => {
  try {
    const actualizado = await Estado.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!actualizado) return res.status(404).json({ message: "Estado no encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    res.status(400).json({ message: "Error al actualizar el estado" });
  }
};

// Eliminar un estado
export const eliminarEstado = async (req, res) => {
  try {
    const eliminado = await Estado.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Estado no encontrado" });
    res.json({ message: "Estado eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el estado:", error);
    res.status(500).json({ message: "Error al eliminar el estado" });
  }
};
