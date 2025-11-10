// routes/clientes.js
import express from "express";
import {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from "../controllers/clientesController.js";

const router = express.Router();

//Mostrar vista con lista de clientes
router.get("/vista", async (req, res) => {
  try {
    const Cliente = (await import("../models/Cliente.js")).default;
    const clientes = await Cliente.find().lean();
    res.render("clientes", { titulo: "Lista de Clientes", clientes });
  } catch (error) {
    console.error("Error al cargar /clientes/vista:", error);
    res.status(500).send("Error al cargar vista de clientes");
  }
});

// Formulario para agregar nuevo cliente
router.get("/vista/nuevo", (req, res) => {
  res.render("clienteForm", { titulo: "Agregar Cliente", cliente: {} });
});

// Guardar cliente nuevo
router.post("/vista", async (req, res) => {
  try {
    const Cliente = (await import("../models/Cliente.js")).default;
    await Cliente.create(req.body);
    res.redirect("/clientes/vista");
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).send("Error al crear cliente");
  }
});

// Ver detalle de un cliente
router.get("/vista/:id", async (req, res) => {
  try {
    const Cliente = (await import("../models/Cliente.js")).default;
    const cliente = await Cliente.findById(req.params.id).lean();

    if (!cliente) return res.status(404).send("Cliente no encontrado");

    res.render("clienteDetalle", { 
      titulo: `Cliente: ${cliente.nombre}`, 
      cliente 
    });
  } catch (error) {
    console.error("Error al ver cliente:", error);
    res.status(500).send("Error al cargar cliente");
  }
});


// Formulario para editar cliente existente
router.get("/:id/editar", async (req, res) => {
  try {
    const Cliente = (await import("../models/Cliente.js")).default;
    const cliente = await Cliente.findById(req.params.id).lean();
    if (!cliente) return res.status(404).send("Cliente no encontrado");
    res.render("clienteForm", { titulo: "Editar Cliente", cliente });
  } catch (error) {
    console.error("Error al cargar edición de cliente:", error);
    res.status(500).send("Error al cargar edición de cliente");
  }
});

// Actualizar cliente
router.put("/:id", async (req, res) => {
  try {
    const Cliente = (await import("../models/Cliente.js")).default;
    await Cliente.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/clientes/vista");
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).send("Error al actualizar cliente");
  }
});

// Eliminar cliente
router.delete("/:id", async (req, res) => {
  try {
    const Cliente = (await import("../models/Cliente.js")).default;
    await Cliente.findByIdAndDelete(req.params.id);
    res.redirect("/clientes/vista");
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).send("Error al eliminar cliente");
  }
});

// Endpoints CRUD
router.get("/", listarClientes);         // Listado de todos los clientes
router.get("/:id", obtenerCliente);      // Ver un solo cliente por id
router.post("/", crearCliente);          // Crear nuevo
router.put("/:id", actualizarCliente);   // Actualizar
router.delete("/:id", eliminarCliente);  // Eliminar

export default router;
