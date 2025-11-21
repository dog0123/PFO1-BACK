import {
  obtenerTodosLosProveedoresService,
  obtenerProveedorPorIdService,
  crearProveedorService,
  actualizarProveedorService,
  eliminarProveedorService
} from "../services/proveedorService.js";


export const listarProveedores = async (req, res) => {
  try {
    const proveedores = await obtenerTodosLosProveedoresService();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar proveedores", error });
  }
};

// por ID
export const obtenerProveedor = async (req, res) => {
  try {
    const proveedor = await obtenerProveedorPorIdService(req.params.id);
    if (!proveedor)
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });

    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener proveedor", error });
  }
};


export const crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = await crearProveedorService(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear proveedor", error });
  }
};


export const actualizarProveedor = async (req, res) => {
  try {
    const actualizado = await actualizarProveedorService(req.params.id, req.body);
    if (!actualizado)
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });

    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar proveedor", error });
  }
};


export const eliminarProveedor = async (req, res) => {
  try {
    const eliminado = await eliminarProveedorService(req.params.id);
    if (!eliminado)
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });

    res.status(204).send(); // Sin contenido
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar proveedor", error });
  }
};
