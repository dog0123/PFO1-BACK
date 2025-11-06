// controllers/proveedorController.js
import Proveedor from "../models/Proveedor.js";

// Lista de todos los proveedores
export const listarProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar proveedores", error });
  }
};

// Obtener un proveedor por ID
export const obtenerProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener proveedor", error });
  }
};

// Crear un nuevo proveedor
export const crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = new Proveedor(req.body);
    await nuevoProveedor.save();
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear proveedor", error });
  }
};

// Actualizar un proveedor existente
export const actualizarProveedor = async (req, res) => {
  try {
    const actualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar proveedor", error });
  }
};

// Eliminar un proveedor
export const eliminarProveedor = async (req, res) => {
  try {
    const eliminado = await Proveedor.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar proveedor", error });
  }
};
