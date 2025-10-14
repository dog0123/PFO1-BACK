// models/Evento.js

import db from '../config/db.js'

async function generarNuevoId() {
  const eventos = await db.getCollection("eventos");
  const ids = eventos.map(e => e.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

class Evento {
  constructor({ nombre, fecha, lugar, proveedores = [] }) {
    this.id = generarNuevoId();
    this.nombre = nombre;
    this.fecha = fecha;
    this.lugar = lugar;
    this.proveedores = proveedores; // array de ID nada mass
  }
}

export default Evento;
