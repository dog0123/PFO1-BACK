import {
  obtenerTodosLosProveedoresService,
  obtenerProveedorPorIdService,
  crearProveedorService,
  actualizarProveedorService,
  eliminarProveedorService
} from "../services/proveedorService.js";

// Listado HTML (Pug)
export const vistaListarProveedoresView = async (req, res) => {
  try {
    const proveedores = await obtenerTodosLosProveedoresService();
    res.render("proveedores", {
      titulo: "Lista de Proveedores",
      proveedores
    });
  } catch (error) {
    console.error("Error en vistaListarProveedores:", error);
    res.status(500).send("Error al cargar la lista");
  }
};

// Formulario de creación
export const vistaNuevoProveedorView = (req, res) => {
  res.render("proveedorForm", {
    titulo: "Agregar nuevo proveedor",
    proveedor: {}
  });
};

// Crear proveedor desde formulario
export const vistaCrearProveedorView = async (req, res) => {
  try {
    await crearProveedorService(req.body);
    res.redirect("/proveedores/vista");
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    res.status(500).send("Error al crear proveedor");
  }
};

// Ver detalle de proveedor
export const vistaVerProveedorView = async (req, res) => {
  try {
    const proveedor = await obtenerProveedorPorIdService(req.params.id);
    if (!proveedor) return res.status(404).send("Proveedor no encontrado");

    res.render("proveedorDetalle", {
      titulo: `Proveedor: ${proveedor.nombre}`,
      proveedor
    });
  } catch (error) {
    console.error("Error al ver proveedor:", error);
    res.status(500).send("Error al cargar proveedor");
  }
};

// Formulario de edición
export const vistaEditarProveedorView = async (req, res) => {
  try {
    const proveedor = await obtenerProveedorPorIdService(req.params.id);
    if (!proveedor) return res.status(404).send("Proveedor no encontrado");

    res.render("proveedorForm", {
      titulo: `Editar proveedor: ${proveedor.nombre}`,
      proveedor
    });
  } catch (error) {
    console.error("Error al cargar formulario:", error);
    res.status(500).send("Error al cargar el formulario de edición");
  }
};

// Actualizar proveedor desde formulario
export const vistaActualizarProveedorView = async (req, res) => {
  try {
    await actualizarProveedorService(req.params.id, req.body);
    res.redirect("/proveedores/vista");
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    res.status(500).send("Error al actualizar proveedor");
  }
};

// Eliminar proveedor desde vista
export const vistaEliminarProveedorView = async (req, res) => {
  try {
    await eliminarProveedorService(req.params.id);
    res.redirect("/proveedores/vista");
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    res.status(500).send("Error al eliminar proveedor");
  }
};