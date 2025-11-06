// controllers/clientesController.js
import Cliente from "../models/Cliente.js";

// Listar todos los clientes
export const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar clientes", error });
  }
};

// Obtener un cliente por ID
export const obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener cliente", error });
  }
};

// Crear un nuevo cliente
export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear cliente", error });
  }
};

// Actualizar un cliente existente
export const actualizarCliente = async (req, res) => {
  try {
    const actualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar cliente", error });
  }
};

// Eliminar un cliente
export const eliminarCliente = async (req, res) => {
  try {
    const eliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.status(204).send(); // Sin contenido
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar cliente", error });
  }
};
