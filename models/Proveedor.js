// Entidad para proveedores

class Proveedor {
  constructor({ id, nombre, servicio, telefono }) {
    this.id = id || Date.now(); // Genera un ID único si no se pasa asi no se rompe la base
    this.nombre = nombre;
    this.servicio = servicio;
    this.telefono = telefono;
  }
}

export default Proveedor;
