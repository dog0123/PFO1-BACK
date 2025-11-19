import {
  obtenerEstadoPorEventoService,
  actualizarEstadoService,
} from "../services/estadoService.js";

// Obtener estado por evento
export const obtenerEstadoPorEvento = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const estado = await obtenerEstadoPorEventoService(eventoId);
    if (!estado) {
      return res.status(404).json({ mensaje: "Estado no encontrado para este evento" });
    }

    res.json(estado);
  } catch (error) {
    console.error("Error al obtener estado:", error);
    res.status(500).json({ mensaje: "Error al obtener estado del evento" });
  }
};

// Actualizar estado (y guardar estado previo en historial)
export const actualizarEstado = async (req, res) => {
  try {
    const id = req.params.id;
    const cambios = req.body;

    const estadoActualizado = await actualizarEstadoService(id, cambios);

    if (!estadoActualizado) {
      return res.status(404).json({ mensaje: "Estado no encontrado" });
    }

    res.json(estadoActualizado);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ mensaje: "Error al actualizar estado" });
  }
};

/*
Estos metodos no se incluyeron en la version final porque la creacion y eliminacion de
este modulo depende exclusivamente de la de el evento relacionado

// Crear estado para un evento

export const crearEstado = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const data = req.body;
    const nuevoEstado = await crearEstadoService(eventoId, data);

    res.status(201).json(nuevoEstado);
  } catch (error) {
    console.error("Error al crear estado:", error);
    res.status(500).json({ mensaje: "Error al crear estado" });
  }
};

// Eliminar estado
export const eliminarEstado = async (req, res) => {
  try {
    const id = req.params.id;
    const estadoEliminado = await eliminarEstadoService(id);

    if (!estadoEliminado) {
      return res.status(404).json({ mensaje: "Estado no encontrado" });
    }

    res.json({ mensaje: "Estado eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado:", error);
    res.status(500).json({ mensaje: "Error al eliminar estado" });
  }
};
*/