import {
  obtenerTodosLosClientesService,
  obtenerClientePorIdService,
  crearClienteService,
  actualizarClienteService,
  eliminarClienteService
} from "../services/clienteService.js";
import mongoose from "mongoose";

export const listarClientesView = async (req, res) => {
  try {
    const clientes = await obtenerTodosLosClientesService();
    res.render("clientes", { titulo: "Lista de Clientes", clientes });
  } catch (error) {
    console.error("Error al cargar lista de clientes:", error);
    res.status(500).send("Error al cargar vista de clientes");
  }
};

export const mostrarFormularioNuevoCliente = (req, res) => {
  res.render("clienteForm", { titulo: "Agregar Cliente", cliente: {} });
};

export const crearClienteView = async (req, res) => {
  try {
    await crearClienteService(req.body);
    res.redirect("/clientes/vista");
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).send("Error al crear cliente");
  }
};

export const verClienteView = async (req, res) => {
  try {
    const cliente = await obtenerClientePorIdService(req.params.id);
    if (!cliente) return res.status(404).send("Cliente no encontrado");

    res.render("clienteDetalle", {
      titulo: `Cliente: ${cliente.nombre}`,
      cliente
    });
  } catch (error) {
    console.error("Error al ver cliente:", error);
    res.status(500).send("Error al cargar cliente");
  }
};

export const editarClienteView = async (req, res) => {
  try {
    const cliente = await obtenerClientePorId(req.params.id);
    if (!cliente) return res.status(404).send("Cliente no encontrado");

    res.render("clienteForm", { titulo: "Editar Cliente", cliente });
  } catch (error) {
    console.error("Error al cargar edición:", error);
    res.status(500).send("Error al cargar edición de cliente");
  }
};

export const actualizarClienteView = async (req, res) => {
  try {
    await actualizarClienteService(req.params.id, req.body);
    res.redirect("/clientes/vista");
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).send("Error al actualizar cliente");
  }
};

export const eliminarClienteView = async (req, res) => {
  try {
    await eliminarClienteService(req.params.id);
    res.redirect("/clientes/vista");
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).send("Error al eliminar cliente");
  }
};