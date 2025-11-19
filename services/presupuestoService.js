import Presupuesto from "../models/Presupuesto.js";

// Obtener todos los presupuestos
export const obtenerTodosLosPresupuestosService = async () => {
  return await Presupuesto.find().lean();
};

// Crear presupuesto inicial (solo se usa al crear un evento)
export const crearPresupuestoInicialService = async (eventoId) => {
  return await Presupuesto.create({ eventoId });
};

// Obtener presupuesto por ID
export const obtenerPresupuestoPorIdService = async (id) => {
  return await Presupuesto.findById(id).lean();
};

// Obtener presupuesto por eventoId
export const obtenerPresupuestoPorEventoIdService = async (eventoId) => {
  return await Presupuesto.findOne({ eventoId }).lean();
};

// Actualizar presupuesto y recalcular total
export const actualizarPresupuestoService = async (id, cambios) => {
  // Primero actualizamos el presupuesto
  const presupuestoActualizado = await Presupuesto.findByIdAndUpdate(
    id,
    cambios,
    { new: true }
  ).lean();

  if (!presupuestoActualizado) return null;

  // Luego recalculamos el total
  await recalcularTotalService(id);

  // Devolvemos el presupuesto actualizado (sin el recalculo aplicado en memoria)
  return presupuestoActualizado;
};

// Eliminar presupuesto (solo desde evento)
export const eliminarPresupuestoService = async (id) => {
  return await Presupuesto.findByIdAndDelete(id);
};

// Procedimiento para recalcular totalGeneral
export const recalcularTotalService = async (id) => {
  const presupuesto = await Presupuesto.findById(id);

  if (!presupuesto) return null;

  const total = presupuesto.items.reduce((acc, item) => {
    const subtotal = (item.cantidad || 1) * (item.precioUnitario || 0);
    return item.tipo === "ingreso" ? acc + subtotal : acc - subtotal;
  }, 0);

  presupuesto.totalGeneral = total;

  await presupuesto.save();

  return null; 
};

