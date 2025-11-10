import db from '../config/db.js'

async function generarNuevoId(coleccion) {
  const eventos = await db.getCollection(coleccion);
  const ids = eventos.map(e => e.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

export default generarNuevoId