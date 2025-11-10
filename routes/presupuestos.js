// routes/presupuestos.js
import express from "express";
import {
  listarPresupuestos,
  obtenerPresupuesto,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto
} from "../controllers/presupuestosController.js";

const router = express.Router();

// Listar todos los presupuestos
router.get("/vista", async (req, res) => {
  try {
    const Presupuesto = (await import("../models/Presupuesto.js")).default;

    const presupuestos = await Presupuesto.find()
      .populate("eventoId")
      .lean();

    res.render("presupuestos", {
      titulo: "Lista de Presupuestos",
      presupuestos
    });
  } catch (error) {
    console.error("Error al cargar /presupuestos/vista:", error);
    res.status(500).send("Error al cargar los presupuestos");
  }
});

// Formulario de creación de presupuesto (debe ir antes que :id)
router.get("/vista/nuevo", async (req, res) => {
  try {
    
    const Presupuesto = (await import("../models/Presupuesto.js")).default;
    const Evento = (await import("../models/Evento.js")).default;

    // Filtrado de eventos sin presupuesto
    const presupuestosExistentes = await Presupuesto.find({ eventoId: { $ne: null } }, "eventoId").lean();
    const eventosConPresupuesto = presupuestosExistentes.map(p => p.eventoId.toString());

    const eventos = await Evento.find({
      _id: { $nin: eventosConPresupuesto }
    }).lean();


    res.render("presupuestoForm", {
      titulo: "Nuevo Presupuesto",
      presupuesto: {},
      eventos
    });
  } catch (error) {
    console.error("Error al cargar formulario de nuevo presupuesto:", error);
    res.status(500).send("Error al cargar formulario de presupuesto");
  }
});

// Ver detalle de un presupuesto
router.get("/vista/:id", async (req, res) => {
  try {
    const Presupuesto = (await import("../models/Presupuesto.js")).default;

    const presupuesto = await Presupuesto.findById(req.params.id)
      .populate("eventoId")
      .lean();

    if (!presupuesto) {
      return res.status(404).send("Presupuesto no encontrado");
    }

    res.render("presupuestoDetalle", {
      titulo: "Detalle del Presupuesto",
      presupuesto
    });
  } catch (error) {
    console.error("Error al obtener presupuesto:", error);
    res.status(500).json({
      mensaje: "Error al obtener presupuesto",
      error
    });
  }
});

// Guardar nuevo presupuesto
router.post("/vista", async (req, res) => {
  try {
    const Presupuesto = (await import("../models/Presupuesto.js")).default;
    await Presupuesto.create(req.body);
    res.redirect("/presupuestos/vista");
  } catch (error) {
    console.error("Error al crear presupuesto:", error);
    res.status(500).send("Error al crear presupuesto");
  }
});

// Formulario de edición
router.get("/:id/editar", async (req, res) => {
  try {
    const Presupuesto = (await import("../models/Presupuesto.js")).default;
    const Evento = (await import("../models/Evento.js")).default;

    const presupuesto = await Presupuesto.findById(req.params.id)
      .populate("eventoId")
      .lean();

    const eventos = await Evento.find().lean();

    if (!presupuesto) return res.status(404).send("Presupuesto no encontrado");

    // Asegurar que eventoId sea un string
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
    console.error("Error al cargar formulario de edición de presupuesto:", error);
    res.status(500).send("Error al cargar formulario");
  }
});

// Actualizar presupuesto
router.put("/:id", async (req, res) => {
  try {
    const Presupuesto = (await import("../models/Presupuesto.js")).default;
    await Presupuesto.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/presupuestos/vista");
  } catch (error) {
    console.error("Error al actualizar presupuesto:", error);
    res.status(500).send("Error al actualizar presupuesto");
  }
});

// Eliminar un ítem de un presupuesto
router.delete("/:presupuestoId/items/:index", async (req, res) => {
  try {
    const { presupuestoId, index } = req.params;
    const Presupuesto = (await import("../models/Presupuesto.js")).default;

    const presupuesto = await Presupuesto.findById(presupuestoId);
    if (!presupuesto) return res.status(404).send("Presupuesto no encontrado");

    // Convertimos el índice a número y validamos
    const idx = parseInt(index, 10);
    if (isNaN(idx) || idx < 0 || idx >= presupuesto.items.length) {
      return res.status(400).send("Índice de ítem inválido");
    }

    // Eliminamos el ítem
    presupuesto.items.splice(idx, 1);

    // Recalculamos el total general
    presupuesto.totalGeneral = presupuesto.items.reduce((acc, item) => {
      const subtotal = item.precioUnitario * (item.cantidad || 1);
      return acc + (item.tipo === "gasto" ? -subtotal : subtotal);
    }, 0);

    await presupuesto.save();

    // Redirigimos correctamente al formulario de edición del presupuesto
    res.redirect(`/presupuestos/editar/${presupuestoId}`);
  } catch (error) {
    console.error("Error al eliminar ítem:", error);
    res.status(500).send("Error al eliminar ítem del presupuesto");
  }
});


router.post("/:id/items", async (req, res) => {
  try {
    const Presupuesto = (await import("../models/Presupuesto.js")).default;

    // armamos el nuevo item
    const nuevoItem = {
      descripcion: req.body.descripcion,
      tipo: req.body.tipo,
      cantidad: Number(req.body.cantidad),
      precioUnitario: Number(req.body.precioUnitario)
    };

    // lo agregamos al presupuesto
    await Presupuesto.findByIdAndUpdate(req.params.id, {
      $push: { items: nuevoItem }
    });
    res.redirect(`/presupuestos/${req.params.id}/editar`);
  } catch (error) {
    console.error("Error al agregar ítem:", error);
    res.status(500).send("Error al agregar ítem");
  }
});


// CRUD principal
router.get("/", listarPresupuestos);        // Listar todos los presupuestos
router.get("/:id", obtenerPresupuesto);     // Buscar por ID
router.post("/", crearPresupuesto);         // Crear nuevo
router.put("/:id", actualizarPresupuesto);  // Actualizar existente
router.delete("/:id", eliminarPresupuesto); // Eliminar

export default router;
