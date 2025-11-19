import {
  crearEventoService,
  obtenerEventoPorIdService,
  obtenerEventoConProveedoresService,
  obtenerEventoPorIdCompletoService,
  obtenerEventosService,
  actualizarEventoService,
  eliminarEventoService
} from "../services/eventoService.js";

export const crearEvento = async (req, res) => {
  try {
    const data = req.body;
    const nuevoEvento = await crearEventoService(data);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).json({ error: "Error al crear evento" });
  }
};

export const obtenerEvento = async (req, res) => {
  try {
    const evento = await obtenerEventoPorIdService(req.params.id);
    if (!evento) return res.status(404).json({ error: "Evento no encontrado" });
    res.json(evento);
  } catch (error) {
    console.error("Error al obtener evento:", error);
    res.status(500).json({ error: "Error al obtener evento" });
  }
};

export const obtenerEventoCompleto = async (req, res) => {
  try {
    const evento = await obtenerEventoPorIdCompletoService(req.params.id);
    if (!evento) return res.status(404).json({ error: "Evento no encontrado" });
    res.json(evento);
  } catch (error) {
    console.error("Error al obtener evento completo:", error);
    res.status(500).json({ error: "Error al obtener evento completo" });
  }
};

export const obtenerEventoConProveedores = async (req, res) => {
  try {
    const evento = await obtenerEventoConProveedoresService(req.params.id);
    if (!evento) return res.status(404).json({ error: "Evento no encontrado" });
    res.json(evento);
  } catch (error) {
    console.error("Error al obtener proveedores del evento:", error);
    res.status(500).json({ error: "Error al obtener proveedores del evento" });
  }
};

export const obtenerEventos = async (req, res) => {
  try {
    const eventos = await obtenerEventosService();
    res.json(eventos);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ error: "Error al obtener eventos" });
  }
};

export const actualizarEvento = async (req, res) => {
  try {
    const cambios = req.body;
    const eventoActualizado = await actualizarEventoService(req.params.id, cambios);

    if (!eventoActualizado) return res.status(404).json({ error: "Evento no encontrado" });

    res.json(eventoActualizado);
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ error: "Error al actualizar evento" });
  }
};

export const eliminarEvento = async (req, res) => {
  try {
    const result = await eliminarEventoService(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ error: "Error al eliminar evento" });
  }
};
