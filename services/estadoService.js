import Estado from "../models/Estado.js";

// Obtener todos los estados
export const obtenerTodosLosEstadosService = async () => {
  return await Estado.find().lean();
};

// Obtener estado por ID
export const obtenerEstadoPorIdService = async (id) => {
  return await Estado.findById(id).lean();
};

// Obtener estado por evento
export const obtenerEstadoPorEventoService = async (eventoId) => {
  return await Estado.findOne({ eventoId }).lean();
};

// Crear un nuevo estado
/*
export const crearEstadoService = async (eventoId, data) => {
  return await Estado.create({
    ...data,
    eventoId
  });
};
*/

// Creando estado inicial
export const crearEstadoInicialService = async (eventoId) => {
  return await Estado.create({ eventoId });
};


// Actualizar estado:
export const actualizarEstadoService = async (id, nuevoEstado) => {
  const estadoExistente = await Estado.findById(id);

  if (!estadoExistente) return null;

  // Guardar el estado anterior en historial
  const estadoPrevio = {
    estadoActual: estadoExistente.estadoActual,
    descripcion: estadoExistente.descripcion,
    fechaDeterminacion: estadoExistente.fechaDeterminacion,
    usuario: estadoExistente.usuario,
    fechaCambio: new Date()
  };

  console.log(estadoPrevio);
  estadoExistente.historial.push(estadoPrevio);

  // Actualizar campos del estado actual
  estadoExistente.estadoActual = nuevoEstado.estadoActual ?? estadoExistente.estadoActual;
  estadoExistente.descripcion = nuevoEstado.descripcion ?? estadoExistente.descripcion;
  estadoExistente.usuario = nuevoEstado.usuario ?? estadoExistente.usuario;
  estadoExistente.fechaDeterminacion = new Date();

  await estadoExistente.save();
  console.log(estadoExistente);
  return estadoExistente.toObject(); // Devuelve el objeto plano
};

// Eliminar un estado
export const eliminarEstadoService = async (id) => {
  return await Estado.findByIdAndDelete(id);
};
