// La lógica para manejar el CRUD con los proveedores

const db = require("../config/db");
const Proveedor = require("../models/Proveedor");

// Traer todos los proveedores
function traer(req, res) {
  const proveedores = db.getCollection("proveedores");
  res.json(proveedores);
}

// Buscar proveedor por ID
function obtenerPorId(req, res) {
  const id = parseInt(req.params.id);
  const proveedores = db.getCollection("proveedores");
  const proveedor = proveedores.find((p) => p.id === id);

  if (proveedor) {
    res.json(proveedor);
  } else {
    res.status(404).json({ error: "Proveedor no encontrado" });
  }
}

// Crear nuevo proveedor
function crear(req, res) {
  const proveedores = db.getCollection("proveedores");

  const nuevoProveedor = new Proveedor(req.body); // Le pasamos los datos por POST en el body
  proveedores.push(nuevoProveedor);

  db.setCollection("proveedores", proveedores);

  res.status(201).json(nuevoProveedor);
}

// Actualizar proveedor existente
function actualizar(req, res) {
  const id = parseInt(req.params.id);
  let proveedores = db.getCollection("proveedores");
  const index = proveedores.findIndex((p) => p.id === id);

  if (index !== -1) {
    proveedores[index] = { ...proveedores[index], ...req.body };
    db.setCollection("proveedores", proveedores);
    res.json(proveedores[index]);
  } else {
    res.status(404).json({ error: "Proveedor no encontrado" });
  }
}

// Eliminar un proveedor
function eliminar(req, res) {
  const id = parseInt(req.params.id);
  let proveedores = db.getCollection("proveedores");
  const filtrados = proveedores.filter((p) => p.id !== id); // De todos los proveedores filtramos a uno

  if (proveedores.length === filtrados.length) { // Si la cantidad no es la misma no se encontro
    return res.status(404).json({ error: "Proveedor no encontrado" });
  }

  db.setCollection("proveedores", filtrados);
  res.status(204).end();
}

module.exports = { traer, obtenerPorId, crear, actualizar, eliminar };
