// Define las rutas para Express.

const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedoresController");

// GET /proveedores trae todos
router.get("/", proveedorController.traer);

// GET /proveedores/:id solo uno por su ID
router.get("/:id", proveedorController.obtenerPorId);

// POST /proveedores crear nuevo (datos en el body como JSON RAW)
router.post("/", proveedorController.crear);

// PUT /proveedores/:id actualizar por ID
router.put("/:id", proveedorController.actualizar);

// DELETE /proveedores/:id chau proveedor por id
router.delete("/:id", proveedorController.eliminar);

module.exports = router;
