// Entidad para proveedores

class Proveedor {
  constructor({ id, nombre, descripcion, servicios, telefono }) {
    this.id = id || Date.now(); // Genera un ID único si no se pasa asi no se rompe la base
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.servicios = servicios;
    this.telefono = telefono;
  }
}

export default Proveedor;
