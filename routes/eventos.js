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



// Guardar nuevo evento
router.post("/vista", async (req, res) => {
  try {
    const Evento = (await import("../models/Evento.js")).default;
    await Evento.create(req.body);
    res.redirect("/eventos/vista");
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).send("Error al crear evento");
  }
});

// Actualizar evento existente
router.put("/:id", async (req, res) => {
  try {
    const Evento = (await import("../models/Evento.js")).default;
    await Evento.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/eventos/vista");
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).send("Error al actualizar evento");
  }
});

// VISTA DETALLE (Pug)
router.get("/vista/:id", async (req, res) => {
  try {
    const Evento = (await import("../models/Evento.js")).default;
    
    const evento = await Evento.findById(req.params.id)
      .populate("clienteId")
      .populate({
    path: "proveedores",
    select: "nombre" // Trae solo el nombre
  })
      .populate("tareas")
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

    //Convertimos la fecha
    const fechaFormateada = evento.fecha
      ? new Date(evento.fecha).toISOString().substring(0, 10)
      : "";
    const Cliente = (await import("../models/Cliente.js")).default;
    const clientes = await Cliente.find().lean();

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

// Mostrar estado del evento
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

// Mostrar los invitados de un evento
router.get("/:id/invitados", async (req, res) => {
  try {
    const Evento = (await import("../models/Evento.js")).default;
    const evento = await Evento.findById(req.params.id).lean();

    if (!evento) return res.status(404).send("Evento no encontrado");

    res.render("eventoInvitados", {
      titulo: `Invitados de ${evento.nombre}`,
      evento
    });
  } catch (error) {
    console.error("Error al cargar invitados del evento:", error);
    res.status(500).send("Error al cargar los invitados del evento");
  }
});

// Agregar un invitado al evento
router.post("/:id/invitados", async (req, res) => {
  try {
    const Evento = (await import("../models/Evento.js")).default;
    const { nombre, contacto } = req.body;

    // Agregamos el nuevo invitado al array
    await Evento.findByIdAndUpdate(req.params.id, {
      $push: { invitados: { nombre, contacto } }
    });

    res.redirect(`/eventos/${req.params.id}/invitados`);
  } catch (error) {
    console.error("Error al agregar invitado:", error);
    res.status(500).send("Error al agregar invitado");
  }
});

// Eliminar un invitado del evento
router.delete("/:eventoId/invitados/:index", async (req, res) => {
  try {
    const Evento = (await import("../models/Evento.js")).default;
    const { eventoId, index } = req.params;

    // Obtenemos el evento
    const evento = await Evento.findById(eventoId);
    if (!evento) return res.status(404).send("Evento no encontrado");

    // Eliminamos el invitado según el índice
    evento.invitados.splice(index, 1);

    await evento.save();

    res.redirect(`/eventos/${eventoId}/invitados`);
  } catch (error) {
    console.error("Error al eliminar invitado:", error);
    res.status(500).send("Error al eliminar invitado");
  }
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
