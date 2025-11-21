import {
  obtenerTodosLosClientesService,
  obtenerClientePorIdService,
  crearClienteService,
  actualizarClienteService,
  eliminarClienteService
} from "../services/clienteService.js";

export const listarClientes = async (req, res) => {
  try {
    const clientes = await obtenerTodosLosClientesService();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar clientes", error });
  }
};

export const obtenerCliente = async (req, res) => {
  try {
    const cliente = await obtenerClientePorIdService(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener cliente", error });
  }
};

export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = await crearClienteService(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear cliente", error });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const actualizado = await actualizarClienteService(req.params.id, req.body);
    if (!actualizado)
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar cliente", error });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const eliminado = await eliminarClienteService(req.params.id);
    if (!eliminado)
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.status(204).send(); // Sin contenido
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar cliente", error });
  }
};
