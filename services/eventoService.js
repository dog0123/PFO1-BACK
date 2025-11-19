// services/eventoService.js
import Evento from "../models/Evento.js";

import { crearEstadoInicialService,
  eliminarEstadoService
 } from "./estadoService.js";
import { crearReporteInicialService,
  eliminarReporteService
 } from "./reporteService.js";
import { crearPresupuestoInicialService,
  eliminarPresupuestoService
 } from "./presupuestoService.js";


export const crearEventoService = async (dataEvento) => {
  const nuevoEvento = await Evento.create(dataEvento);
  
  const estado = await crearEstadoInicialService(nuevoEvento._id);
  const reporte = await crearReporteInicialService(nuevoEvento._id);
  const presupuesto = await crearPresupuestoInicialService(nuevoEvento._id);

  nuevoEvento.estadoId = estado._id;
  nuevoEvento.reporteId = reporte._id;
  nuevoEvento.presupuestoId = presupuesto._id;

  await nuevoEvento.save();

  return nuevoEvento.toObject();
};

export const obtenerEventoConProveedoresService = async (eventoId) => {
  // Traemos el evento (no lean aún porque podríamos poblar)
  const evento = await Evento.findById(eventoId).populate('proveedores.proveedorId').lean();

  if (!evento) return null;
  
  const todos = evento.proveedores.map(item => {
    // Caso: estructura subdocumento con proveedorId (poblado o null)
    if (item && item.proveedorId) {
      // proveedorId poblado por populate => es el doc del proveedor
      const provDoc = item.proveedorId;
      return {
        _id: provDoc._id,
        nombre: provDoc.nombre ?? item.nombre,
        servicio: provDoc.servicio ?? item.servicio,
        telefono: provDoc.telefono ?? item.telefono,
        email: provDoc.email ?? item.email,
        direccion: provDoc.direccion ?? item.direccion,
        vivo: true,
        eliminado: false
      };
    }

    // Caso: snapshot embebido (no tiene proveedorId o tiene eliminado flag)
    // item puede contener los campos de snapshot: nombre, servicio, eliminado, eliminadoEn...
    return {
      _id: item._id ?? null,
      nombre: item.nombre ?? "",
      servicio: item.servicio ?? "",
      telefono: item.telefono ?? "",
      email: item.email ?? "",
      direccion: item.direccion ?? "",
      vivo: item.eliminado ? false : (item.proveedorId ? true : false),
      eliminado: !!item.eliminado,
      eliminadoEn: item.eliminadoEn ?? null
    };
  });

  // Devolvemos el evento con un field auxiliar `todosLosProveedores`
  return {
    ...evento,
    todosLosProveedores: todos
  };
};

export const obtenerEventosService = async () => {
  return await Evento.find().lean();
};

// Obtener un evento por ID (con optional populate)
export const obtenerEventoPorIdService = async (id) => {
  return await Evento.findById(id).lean();
};

// Actualizar un evento
export const actualizarEventoService = async (id, cambios) => {
  return await Evento.findByIdAndUpdate(id, cambios, { new: true }).lean();
};

// Ver evento completo:
export const obtenerEventoPorIdCompletoService = async (id) => {
  return await Evento.findById(id)
      .populate("clienteId")
      .populate({
          path: "proveedores.proveedorId",
          select: "nombre servicio telefono email direccion"
      })
      .populate({
          path: "reporteId",
          select: "encabezado reporte encuestasDeSatisfaccion feedbackSupervisorDe feedbackParticipantes",
        })
      .populate({
          path: "estadoId",
          select: "estadoActual descripcion fechaDeterminacion usuario historial"
        })
      .populate({
          path: "presupuestoId",
          select: "nombre fechaEmision estado items totalGeneral"
    })
      .lean();
}

export const eliminarEventoService = async (eventoId) => {
  const evento = await Evento.findById(eventoId);

  await eliminarEstadoService(evento.estadoId);
  await eliminarReporteService(evento.reporteId);
  await eliminarPresupuestoService(evento.presupuestoId);
  
  await Evento.findByIdAndDelete(eventoId);
  return { ok: true };
};