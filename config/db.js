// Maneja el archivo JSON como si fuera una base de datos

import {promises as fs} from 'fs';
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo (en el mismo lugar que db.js)
const DB_FILE = path.join(__dirname, "basedatos.json");

// Leer toda la base de datos
async function load() {
  const data = await fs.readFile(DB_FILE, "utf-8");
  return JSON.parse(data); // Como lo guardamos en texto, lo volvemos a convertir
}

// Guardar toda la base de datos
async function save(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Tratando de emular mongo con colecciones para separar por categorias la informacion (proveedores, clientes...)
// Obtener una colección (por ahora proveedores)
async function getCollection(name) {
  const db = await load();
  return db[name] || [];
}

// Reemplazar una coleccion
async function setCollection(name, collection) {
  const db = await load();
  db[name] = collection;
  await save(db);
}

const db = {getCollection, setCollection}

export default db;
