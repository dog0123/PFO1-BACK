// controllers/presupuestosViewsController.js
import Evento from "../models/Evento.js";
import {
  obtenerPresupuestoPorIdService,
  obtenerTodosLosPresupuestosService,
  actualizarPresupuestoService,
  recalcularTotalService
} from "../services/presupuestoService.js";

/**
 * Helper: construir mapa id -> nombre evento
 */
const construirMapaEventos = async (ids) => {
  if (!ids || ids.length === 0) return {};
  const eventos = await Evento.find({ _id: { $in: ids } }).select("nombre").lean();
  const mapa = {};
  eventos.forEach(e => { mapa[e._id.toString()] = e.nombre; });
  return mapa;
};

//   Listar todos los presupuestos (vista)
export const vistaListarPresupuestos = async (req, res) => {
  try {
    // Traigo todos los presupuestos mediante el service (sin populate)
    const presupuestos = await obtenerTodosLosPresupuestosService();

    // Extraigo ids de eventos y busco sus nombres
    const idsEventos = presupuestos
      .map(p => p.eventoId)
      .filter(Boolean)
      .map(id => id.toString());

    const mapaEventos = await construirMapaEventos([...new Set(idsEventos)]);

    // Agrego el nombre del evento a cada presupuesto para la vista
    const presupuestosParaVista = presupuestos.map(p => ({
      ...p,
      eventoNombre: p.eventoId ? (mapaEventos[p.eventoId.toString()] || "Sin evento") : "Sin evento"
    }));

    res.render("presupuestos", {
      titulo: "Lista de Presupuestos",
      presupuestos: presupuestosParaVista
    });
  } catch (error) {
    console.error("Error al cargar /presupuestos/vista:", error);
    res.status(500).send("Error al cargar los presupuestos");
  }
};

export const vistaDetallePresupuesto = async (req, res) => {
  try {
    const id = req.params.id;
    const presupuesto = await obtenerPresupuestoPorIdService(id);

    if (!presupuesto) return res.status(404).send("Presupuesto no encontrado");

    // Obtener nombre del evento (si corresponde)
    let evento = null;
    if (presupuesto.eventoId) {
      evento = await Evento.findById(presupuesto.eventoId).select("nombre").lean();
    }

    const origen = req.query.from; // 'listado' o 'evento'
    const volverUrl = origen === 'evento' && evento ? `/eventos/vista/${evento._id}` : '/reportes/vista';

    res.render("presupuestoDetalle", {
      titulo: "Detalle del Presupuesto",
      presupuesto,
      evento,
      volverUrl
    });
  } catch (error) {
    console.error("Error al obtener presupuesto:", error);
    res.status(500).send("Error al obtener presupuesto");
  }
};

export const vistaEditarPresupuesto = async (req, res) => {
  try {
    const id = req.params.id;
    const presupuesto = await obtenerPresupuestoPorIdService(id);

    if (!presupuesto) return res.status(404).send("Presupuesto no encontrado");

    const eventos = await Evento.find().lean();

    // asegurar que eventoId sea string para el select en la vista
    if (presupuesto.eventoId && presupuesto.eventoId._id) {
      presupuesto.eventoId = presupuesto.eventoId._id.toString();
    }

    res.render("presupuestoForm", {
      titulo: `Editar Presupuesto: ${presupuesto.nombre}`,
      presupuesto,
      eventos,
      action: `/presupuestos/${presupuesto._id}?_method=PUT`
    });
  } catch (error) {
    console.error("Error al cargar formulario de edición:", error);
    res.status(500).send("Error al cargar formulario");
  }
};

//   Actualizar presupuesto
export const vistaActualizarPresupuesto = async (req, res) => {
  try {
    const id = req.params.id;
    await actualizarPresupuestoService(id, req.body);

    // Si el body trae items (o los modificaste desde el form), recalculamos el total
    if (req.body.items) {
      await recalcularTotalService(id);
    }

    res.redirect("/presupuestos/vista");
  } catch (error) {
    console.error("Error al actualizar presupuesto:", error);
    res.status(500).send("Error al actualizar presupuesto");
  }
};

//   Eliminar ítem del presupuesto (vista)
export const vistaEliminarItem = async (req, res) => {
  try {
    const { presupuestoId, index } = req.params;

    // obtengo presupuesto (sin modificar modelo directo)
    const presupuesto = await obtenerPresupuestoPorIdService(presupuestoId);
    if (!presupuesto) return res.status(404).send("Presupuesto no encontrado");

    const idx = parseInt(index, 10);
    if (isNaN(idx) || idx < 0 || idx >= presupuesto.items.length) {
      return res.status(400).send("Índice de ítem inválido");
    }

    const nuevosItems = presupuesto.items.slice();
    nuevosItems.splice(idx, 1);

    // actualizo items usando el service
    await actualizarPresupuestoService(presupuestoId, { items: nuevosItems });

    // recalculo total con la función dedicada (usa modelo internamente)
    await recalcularTotalService(presupuestoId);

    res.redirect(`/presupuestos/${presupuestoId}/editar`);
  } catch (error) {
    console.error("Error al eliminar ítem:", error);
    res.status(500).send("Error al eliminar ítem del presupuesto");
  }
};

//   Agregar ítem (vista)
export const vistaAgregarItem = async (req, res) => {
  try {
    const id = req.params.id;

    const nuevoItem = {
      descripcion: req.body.descripcion,
      tipo: req.body.tipo,
      cantidad: Number(req.body.cantidad),
      precioUnitario: Number(req.body.precioUnitario)
    };

    // obtengo presupuesto actual
    const presupuesto = await obtenerPresupuestoPorIdService(id);
    if (!presupuesto) return res.status(404).send("Presupuesto no encontrado");

    const nuevosItems = presupuesto.items ? [...presupuesto.items, nuevoItem] : [nuevoItem];

    // actualizo items usando el service
    await actualizarPresupuestoService(id, { items: nuevosItems });

    // recalculo total con la función dedicada
    await recalcularTotalService(id);

    res.redirect(`/presupuestos/${id}/editar`);
  } catch (error) {
    console.error("Error al agregar ítem:", error);
    res.status(500).send("Error al agregar ítem");
  }
};
