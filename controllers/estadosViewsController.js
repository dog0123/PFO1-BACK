// controllers/estadoViewsController.js
import {
  obtenerEstadoPorEventoService,
  actualizarEstadoService
} from "../services/estadoService.js";
import { obtenerEventoPorIdService} from "../services/eventoService.js";


export const mostrarEstadoEventoView = async (req, res) => {
  try {
    const evento = await obtenerEventoPorIdService(req.params.eventoId);
    if (!evento) return res.status(404).send("Evento no encontrado");

    const estado = await obtenerEstadoPorEventoService(evento._id);

    res.render("eventoEstado", {
      titulo: `Estado del evento: ${evento.nombre}`,
      evento,
      estado,
    });
  } catch (error) {
    console.error("Error al mostrar estado del evento:", error);
    res.status(500).send("Error al cargar estado del evento");
  }
};


// POST
export const actualizarEstadoEventoView = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const cambios = req.body;

    await actualizarEstadoService(eventoId, cambios);

    res.redirect(`/estados/${eventoId}/vista`);
  } catch (error) {
    console.error("Error al actualizar estado del evento:", error);
    res.status(500).send("Error al actualizar estado del evento");
  }
};
