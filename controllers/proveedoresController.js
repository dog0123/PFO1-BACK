// La lógica para manejar el CRUD con los proveedores

import db from "../config/db.js";
import Proveedor from "../models/Proveedor.js";

// Traer todos los proveedores
async function traer(req, res) {
  const proveedores = await db.getCollection("proveedores");
  res.json(proveedores);
}

// Buscar proveedor por ID
async function obtenerPorId(req, res) {
  const id = parseInt(req.params.id);
  const proveedores = await db.getCollection("proveedores");
  const proveedor = proveedores.find((p) => p.id === id);

  if (proveedor) {
    res.json(proveedor);
  } else {
    res.status(404).json({ error: "Proveedor no encontrado" });
  }
}

// Crear nuevo proveedor
async function crear(req, res) {
  const proveedores = await db.getCollection("proveedores");

  const nuevoProveedor = new Proveedor(req.body); // Le pasamos los datos por POST en el body
  proveedores.push(nuevoProveedor);

  db.setCollection("proveedores", proveedores);

  res.status(201).json(nuevoProveedor);
}

// Actualizar proveedor existente
async function actualizar(req, res) {
  const id = parseInt(req.params.id);
  let proveedores = await db.getCollection("proveedores");
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
async function eliminar(req, res) {
  const id = parseInt(req.params.id);
  let proveedores = await db.getCollection("proveedores");
  const filtrados = proveedores.filter((p) => p.id !== id); // De todos los proveedores filtramos a uno

  if (proveedores.length === filtrados.length) { // Si la cantidad no es la misma no se encontro
    return res.status(404).json({ error: "Proveedor no encontrado" });
  }

  db.setCollection("proveedores", filtrados);
  res.status(204).end();
}

const proveedoresController = { traer, obtenerPorId, crear, actualizar, eliminar };
export default proveedoresController;
