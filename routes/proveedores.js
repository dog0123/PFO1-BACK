import express from "express";

import {
  listarProveedores,
  obtenerProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../controllers/proveedoresController.js";

import {
  vistaListarProveedoresView,
  vistaNuevoProveedorView,
  vistaCrearProveedorView,
  vistaVerProveedorView,
  vistaEditarProveedorView,
  vistaActualizarProveedorView,
  vistaEliminarProveedorView
} from "../controllers/proveedoresViewsController.js";

const router = express.Router();

router.get("/vista", vistaListarProveedoresView);
router.get("/vista/nuevo", vistaNuevoProveedorView);
router.post("/vista", vistaCrearProveedorView);
router.get("/vista/:id", vistaVerProveedorView);
router.get("/vista/:id/editar", vistaEditarProveedorView);
router.put("/vista/:id", vistaActualizarProveedorView);
router.delete("/vista/:id", vistaEliminarProveedorView);

router.get("/", listarProveedores);
router.get("/:id", obtenerProveedor);
router.post("/", crearProveedor);
router.put("/:id", actualizarProveedor);
router.delete("/:id", eliminarProveedor);

export default router;
