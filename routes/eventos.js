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
    const eventos = await Evento.find().lean();
    res.render("eventos", { titulo: "Lista de Eventos", eventos });
  } catch (error) {
    console.error("Error al cargar /eventos/vista:", error);
    res.status(500).json({ error: error.message });
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
