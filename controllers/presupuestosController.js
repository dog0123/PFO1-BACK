import {
  obtenerTodosLosPresupuestosService,
  obtenerPresupuestoPorIdService,
  obtenerPresupuestoPorEventoIdService,
  actualizarPresupuestoService
} from "../services/presupuestoService.js";


export const obtenerTodosLosPresupuestos = async (req, res) => {
  try {
    const presupuestos = await obtenerTodosLosPresupuestosService();
    res.json(presupuestos);
  } catch (error) {
    console.error("Error al obtener presupuestos:", error);
    res.status(500).json({ error: "Error al obtener presupuestos" });
  }
};


export const obtenerPresupuestoId = async (req, res) => {
  try {
    const presupuesto = await obtenerPresupuestoPorIdService(req.params.id);
    if (!presupuesto) {
      return res.status(404).json({ mensaje: "Presupuesto no encontrado" });
    }

    res.json(presupuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const obtenerPresupuestoEvento = async (req, res) => {
  try {
    const presupuesto = await obtenerPresupuestoPorEventoIdService(req.params.eventoId);

    if (!presupuesto) {
      return res.status(404).json({ mensaje: "Presupuesto no encontrado" });
    }

    res.json(presupuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const actualizarPresupuesto = async (req, res) => {
  try {
    const id = req.params.id;

    const presupuestoActualizado = await actualizarPresupuestoService(id, req.body);

    if (!presupuestoActualizado) {
      return res.status(404).json({ mensaje: "Presupuesto no encontrado" });
    }

    res.json(presupuestoActualizado);

  } catch (error) {
    console.error("Error al actualizar presupuesto:", error);
    res.status(500).json({ error: "Error al actualizar el presupuesto" });
  }
};