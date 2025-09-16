// Maneja el archivo JSON como si fuera una base de datos

const fs = require("fs");
const path = require("path");

// Ruta absoluta al archivo (en el mismo lugar que db.js)
const DB_FILE = path.join(__dirname, "basedatos.json");

// Leer toda la base de datos
function load() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data); // Como lo guardamos en texto, lo volvemos a convertir
}

// Guardar toda la base de datos
function save(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Tratando de emular mongo con colecciones para separar por categorias la informacion (proveedores, clientes...)
// Obtener una colección (por ahora proveedores)
function getCollection(name) {
  const db = load();
  return db[name] || [];
}

// Reemplazar una coleccion
function setCollection(name, collection) {
  const db = load();
  db[name] = collection;
  save(db);
}

module.exports = { getCollection, setCollection };
