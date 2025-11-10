// routes/invitados.js
import express from "express";
import {
  listarInvitados,
  listarPorEvento,
  obtenerInvitado,
  crearInvitado,
  actualizarInvitado,
  eliminarInvitado,
  confirmarAsistencia,
  registrarEntrada
} from "../controllers/invitadosController.js";

const router = express.Router();

// Obtener todos los invitados 
router.get("/vista", async (req, res) => {
  try {
    const Invitado = (await import("../models/Invitado.js")).default;
    const invitados = await Invitado.find()
      .populate("eventoId") // ✅ Trae los datos del evento relacionado
      .lean();

    const Evento = (await import("../models/Evento.js")).default;
    const eventos = await Evento.find().lean();

    res.render("invitados", {
      titulo: "Lista de Invitados",
      invitados,
      eventos
    });
  } catch (error) {
    console.error("Error al obtener invitados:", error);
    res.status(500).json({ error: "Error al obtener invitados" });
  }
});

// Formulario de creación de invitado
router.get("/vista/nuevo", async (req, res) => {
  try {
    const Invitado = (await import("../models/Invitado.js")).default;
    const Evento = (await import("../models/Evento.js")).default;

    // Traemos todos los eventos disponibles para el select
    const eventos = await Evento.find().lean();

    res.render("invitadoForm", {
      titulo: "Nuevo Invitado",
      invitado: {},
      eventos
    });
  } catch (error) {
    console.error("Error al cargar formulario de nuevo invitado:", error);
    res.status(500).send("Error al cargar formulario de invitado");
  }
});

// Mostrar detalle de un invitado
router.get("vista/:id", async (req, res) => {
  try {
    const Invitado = (await import("../models/Invitado.js")).default;

    const invitado = await Invitado.findById(req.params.id)
      .populate("eventoId") // muestra datos del evento asociado
      .lean();

    if (!invitado) {
      return res.status(404).send("Invitado no encontrado");
    }

    res.render("invitadoDetalle", {
      titulo: "Detalle del Invitado",
      invitado
    });
  } catch (error) {
    console.error("Error al obtener detalle del invitado:", error);
    res.status(500).send("Error al cargar el detalle del invitado");
  }
});



// Endpoints CRUD principales
router.get("/", listarInvitados);                    // Lista de todos los invitados
router.get("/:id", obtenerInvitado);                 // Ver un invitado en especial
router.post("/", crearInvitado);                     // Crear nuevo
router.put("/:id", actualizarInvitado);              // Actualizar
router.delete("/:id", eliminarInvitado);             // Eliminar

// Extras: relaciones y cambios de estado
router.get("/evento/:eventoId", listarPorEvento);    // Listar invitados de un evento
router.put("/:id/confirmar", confirmarAsistencia);   // Confirmar asistencia
router.put("/:id/asistio", registrarEntrada);        // Registrar entrada

export default router;
