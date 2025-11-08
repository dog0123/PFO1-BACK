// routes/eventos.js
import express from "express";
import {
  listarEventos,
  obtenerEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
  obtenerTareasPorEvento
} from "../controllers/eventosController.js";

const router = express.Router();


// VISTA HTML (Pug)
router.get("/vista", async (req, res) => {
  try {
    const Evento = (await import("../models/Evento.js")).default;
    
    const eventos = await Evento.find()
      .populate("estadoId")
      .lean();

    res.render("eventos", { titulo: "Lista de Eventos", eventos });
  } catch (error) {
    console.error("Error al cargar /eventos/vista:", error);
    res.status(500).json({ error: error.message });
  }
  });
// 🔹 VISTA DETALLE (Pug)
router.get("/vista/:id", async (req, res) => {
  try {
    const Evento = (await import("../models/Evento.js")).default;
    
    const evento = await Evento.findById(req.params.id)
      .populate("clienteId")
      .populate("proveedores")
      .populate("tareas")
      .populate("invitados")
      .populate({
          path: "reporteId",
          select: "encabezado reporte encuestasDeSatisfaccion feedbackSupervisorDe feedbackParticipantes",
        })
      .populate({
          path: "estadoId",
          select: "estadoActual descripcion fechaDeterminacion usuario historial"
        })
      .lean();

    if (!evento) {
      return res.status(404).send("Evento no encontrado");
    }

    // 👇 Convertimos la fecha para el input type="date"
    const fechaFormateada = evento.fecha
      ? new Date(evento.fecha).toISOString().substring(0, 10)
      : "";
    const Cliente = (await import("../models/Cliente.js")).default;
    const clientes = await Cliente.find().lean();


    // Renderizamos pasando la fecha ya lista
    res.render("eventoDetalle", {
      titulo: "Detalle del Evento",
      evento,
      clientes,
      fechaFormateada
    });
  } catch (error) {
    console.error("Error al cargar /eventos/vista/:id:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📄 Mostrar estado del evento
router.get("/:id/estado", async (req, res) => {
  const Estado = (await import("../models/Estado.js")).default;
  const Evento = (await import("../models/Evento.js")).default;

  const evento = await Evento.findById(req.params.id).lean();
  if (!evento) return res.status(404).send("Evento no encontrado");

  const estado = await Estado.findOne({ eventoId: evento._id }).lean();

  res.render("eventoEstado", {
    titulo: `Estado del evento: ${evento.nombre}`,
    evento,
    estado,
  });
});


// 📍 POST /eventos/:id/estado
router.post("/:id/estado", async (req, res) => {
  try {
    const Estado = (await import("../models/Estado.js")).default;
    const Evento = (await import("../models/Evento.js")).default;

    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).send("Evento no encontrado");

    // Buscamos el estado actual del evento
    let estado = await Estado.findOne({ eventoId: evento._id });

    // Si ya existe, actualizamos y guardamos el historial
    if (estado) {
      const { estadoActual, descripcion, usuario, fechaDeterminacion } = req.body;

      // Guardamos el estado anterior en el historial
      estado.historial.push({
        estadoAnterior: estado.estadoActual,
        descripcionAnterior: estado.descripcion,
        fechaCambio: new Date(),
      });

      // Actualizamos los campos principales
      estado.estadoActual = estadoActual;
      estado.descripcion = descripcion;
      estado.usuario = usuario;
      estado.fechaDeterminacion = fechaDeterminacion || new Date();

      await estado.save();
    } else {
      // Si no existe, lo creamos desde cero
      estado = await Estado.create({
        ...req.body,
        eventoId: evento._id,
      });
    }

    res.redirect(`/eventos/${evento._id}/estado`);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).send("Error al actualizar estado");
  }
});



// Mostrar proveedores del evento
router.get("/:id/proveedores", async (req, res) => {
  const Evento = (await import("../models/Evento.js")).default;
  const Proveedor = (await import("../models/Proveedor.js")).default;

  const evento = await Evento.findById(req.params.id).populate("proveedores").lean();
  if (!evento) return res.status(404).send("Evento no encontrado");

  const todos = await Proveedor.find().lean();
  const asignados = evento.proveedores.map(p => p._id.toString());
  const disponibles = todos.filter(p => !asignados.includes(p._id.toString()));

  res.render("eventoProveedores", {
    titulo: `Proveedores de ${evento.nombre}`,
    evento,
    proveedoresAsignados: evento.proveedores,
    proveedoresDisponibles: disponibles
  });
});

// Agregar proveedor al evento (desde un form)
router.post("/:id/proveedores", async (req, res) => {
  const Evento = (await import("../models/Evento.js")).default;
  const proveedorId = req.body.proveedorId;

  if (!proveedorId) return res.redirect(`/eventos/${req.params.id}/proveedores`);

  await Evento.findByIdAndUpdate(req.params.id, {
    $addToSet: { proveedores: proveedorId }
  });

  res.redirect(`/eventos/${req.params.id}/proveedores`);
});

// Quitar proveedor del evento
router.delete("/:id/proveedores/:proveedorId", async (req, res) => {
  const Evento = (await import("../models/Evento.js")).default;

  await Evento.findByIdAndUpdate(req.params.id, {
    $pull: { proveedores: req.params.proveedorId }
  });

  res.redirect(`/eventos/${req.params.id}/proveedores`);
});


// CRUD principal
router.get("/", listarEventos);
router.get("/:id", obtenerEvento);
router.post("/", crearEvento);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

// Relación: obtener todas las tareas de un evento
router.get("/:id/tareas", obtenerTareasPorEvento);

export default router;
