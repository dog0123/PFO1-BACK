// routes/proveedores.js
import express from "express";
import {
  listarProveedores,
  obtenerProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../controllers/proveedoresController.js";

const router = express.Router();

// VISTA HTML (Pug)
router.get("/vista", async (req, res) => {
  try {
    const Proveedor = (await import("../models/Proveedor.js")).default;
    const proveedores = await Proveedor.find().lean();
    res.render("proveedores", { titulo: "Lista de Proveedores", proveedores });
  } catch (error) {
    console.error("Error al cargar /proveedores/vista:", error);
    res.status(500).json({ error: error.message });
  }
});

// Formulario de creación
router.get("/vista/nuevo", (req, res) => {
  res.render("proveedorForm", { 
    titulo: "Agregar nuevo proveedor",
    proveedor: {}
  });
});

// Guardar proveedor nuevo
router.post("/vista", async (req, res) => {
  try {
    const Proveedor = (await import("../models/Proveedor.js")).default;
    await Proveedor.create(req.body);
    res.redirect("/proveedores/vista");
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    res.status(500).send("Error al crear proveedor");
  }
});

router.get("/vista/:id", async (req, res) => {
  try {
    const Proveedor = (await import("../models/Proveedor.js")).default;
    const proveedor = await Proveedor.findById(req.params.id).lean();
    if (!proveedor) return res.status(404).send("Proveedor no encontrado");

    res.render("proveedorDetalle", { 
      titulo: `Proveedor: ${proveedor.nombre}`, 
      proveedor 
    });
  } catch (error) {
    console.error("Error al ver proveedor:", error);
    res.status(500).send("Error al cargar proveedor");
  }
});

router.get("/:id/editar", async (req, res) => {
  try {
    const Proveedor = (await import("../models/Proveedor.js")).default;
    const proveedor = await Proveedor.findById(req.params.id).lean();
    if (!proveedor) return res.status(404).send("Proveedor no encontrado");

    res.render("proveedorForm", { 
      titulo: `Editar proveedor: ${proveedor.nombre}`,
      proveedor
    });
  } catch (error) {
    console.error("Error al editar proveedor:", error);
    res.status(500).send("Error al cargar formulario de edición");
  }
});

// Actualizar proveedor
router.put("/:id", async (req, res) => {
  try {
    const Proveedor = (await import("../models/Proveedor.js")).default;
    await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/proveedores/vista");
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    res.status(500).send("Error al actualizar proveedor");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const Proveedor = (await import("../models/Proveedor.js")).default;
    await Proveedor.findByIdAndDelete(req.params.id);
    res.redirect("/proveedores/vista");
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    res.status(500).send("Error al eliminar proveedor");
  }
});


// Endpoints CRUD
router.get("/", listarProveedores);         // Mostrar todos
router.get("/:id", obtenerProveedor);       // Buscar un proveedor por id
router.post("/", crearProveedor);           // Crear nuevo proveedor
router.put("/:id", actualizarProveedor);    // Actualizar registro
router.delete("/:id", eliminarProveedor);   // Eliminar registro

export default router;

