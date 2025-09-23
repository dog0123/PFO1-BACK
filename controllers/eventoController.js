// controllers/eventoController.js

import db from "../config/db.js";
import Evento from "../models/Evento.js";

// GET /eventos
function traer(req, res) {
  const eventos = db.getCollection("eventos");
  res.json(eventos);
}

// GET /eventos/:id
function obtenerPorId(req, res) {
  const id = parseInt(req.params.id);
  const eventos = db.getCollection("eventos");
  const evento = eventos.find(e => e.id === id);

  if (evento) {
    res.json(evento);
  } else {
    res.status(404).json({ error: "Evento no encontrado" });
  }
}

// POST /eventos
function crear(req, res) {
  const eventos = db.getCollection("eventos");

  const nuevoEvento = new Evento(req.body);
  eventos.push(nuevoEvento);
  db.setCollection("eventos", eventos);

  res.status(201).json(nuevoEvento);
}

// PUT /eventos/:id
function actualizar(req, res) {
  const id = parseInt(req.params.id);
  let eventos = db.getCollection("eventos");
  const index = eventos.findIndex(e => e.id === id);

  if (index !== -1) {
    eventos[index] = { ...eventos[index], ...req.body };
    db.setCollection("eventos", eventos);
    res.json(eventos[index]);
  } else {
    res.status(404).json({ error: "Evento no encontrado" });
  }
}

// DELETE /eventos/:id
function eliminar(req, res) {
  const id = parseInt(req.params.id);
  let eventos = db.getCollection("eventos");
  const filtrados = eventos.filter(e => e.id !== id);

  if (eventos.length === filtrados.length) {
    return res.status(404).json({ error: "Evento no encontrado" });
  }

  db.setCollection("eventos", filtrados);
  res.status(204).end();
}

// GET /eventos/completos
function traerConProveedores(req, res) {
  const eventos = db.getCollection("eventos");
  const proveedores = db.getCollection("proveedores");

  const eventosCompletos = eventos.map(evento => {
    const proveedoresAsignados = evento.proveedores.map(id =>
      proveedores.find(p => p.id === id)
    ).filter(p => p !== undefined);

    return {
      ...evento,
      proveedores: proveedoresAsignados
    };
  });

  res.json(eventosCompletos);
}

// GET /eventos/:id/completo
function obtenerEventoCompleto(req, res) {
  const id = parseInt(req.params.id);
  const eventos = db.getCollection("eventos");
  const proveedores = db.getCollection("proveedores");

  const evento = eventos.find(e => e.id === id);

  if (!evento) {
    return res.status(404).json({ error: "Evento no encontrado" });
  }

  const proveedoresAsignados = evento.proveedores.map(id =>
    proveedores.find(p => p.id === id)
  ).filter(p => p !== undefined);

  const eventoCompleto = {
    ...evento,
    proveedores: proveedoresAsignados
  };

  res.json(eventoCompleto);
}

const eventoController = {
  traer,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  traerConProveedores,
  obtenerEventoCompleto
}

export default eventoController;
