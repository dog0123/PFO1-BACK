// Define las rutas para Express.

import express from 'express'
import proveedorController from "../controllers/proveedoresController.js";

const router = express.Router();

router.get("/", proveedorController.traer);
router.get("/:id", proveedorController.obtenerPorId);
router.post("/", proveedorController.crear);
router.put("/:id", proveedorController.actualizar);
router.delete("/:id", proveedorController.eliminar);

export default router;
