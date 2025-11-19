import Cliente from "../models/Cliente.js";
import Evento from "../models/Evento.js";

export const obtenerTodosLosClientesService = async () => {
  return await Cliente.find().lean();
};

export const obtenerClientePorIdService = async (id) => {
  return await Cliente.findById(id).lean();
};

export const crearClienteService = async (cliente) => {
  return await Cliente.create(cliente);
};

export const actualizarClienteService = async (id, cliente) => {
  return await Cliente.findByIdAndUpdate(id, cliente, { new: true }).lean();
};

export const eliminarClienteService = async (id) => {
  const cliente = await Cliente.findById(id);
  if (!cliente) return null;

  const eventos = await Evento.find({ clienteId: id });

  for (const evento of eventos) {
    evento.clienteBackup = {
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      email: cliente.email
    };

    evento.clienteId = null;
    await evento.save();
  }
  
  await Cliente.findByIdAndDelete(id);

  return cliente;
};
