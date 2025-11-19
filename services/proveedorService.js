import Proveedor from "../models/Proveedor.js";

export const obtenerTodosLosProveedoresService = async () => {
  return await Proveedor.find().lean();
};

export async function obtenerProveedoresPorIdsService(ids) {
  return await Proveedor.find({ _id: { $in: ids } }).lean();
}

export const obtenerProveedorPorIdService = async (id) => {
  return await Proveedor.findById(id).lean();
};

export const crearProveedorService = async (proveedor) => {
  return await Proveedor.create(proveedor);
};

export const actualizarProveedorService = async (id, proveedor) => {
  return await Proveedor.findByIdAndUpdate(id, proveedor, { new: true }).lean();
};

export const eliminarProveedorService = async (proveedorId) => {
  const Proveedor = (await import("../models/Proveedor.js")).default;
  const Evento = (await import("../models/Evento.js")).default;

  const proveedor = await Proveedor.findById(proveedorId).lean();
  if (!proveedor) return null;

  await Proveedor.findByIdAndDelete(proveedorId);
  const eventos = await Evento.find({
    "proveedores.proveedorId": proveedorId
  });

  // Convertir referencias en snapshots
  for (const evento of eventos) {
    evento.proveedores = evento.proveedores.map((p) => {
      if (p.proveedorId?.toString() === proveedorId.toString()) {
        return {
          proveedorId: null,
          nombre: proveedor.nombre,
          servicio: proveedor.servicio,
          telefono: proveedor.telefono,
          email: proveedor.email,
          direccion: proveedor.direccion,
          eliminado: true,
          eliminadoEn: new Date()
        };
      }
      return p;
    });

    await evento.save();
  }
  return { mensaje: "Proveedor eliminado y referencias guardadas como snapshot" };
};
