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

import { isAuthenticated } from "./index.js";

const router = express.Router();

router.get("/vista", isAuthenticated, vistaListarProveedoresView);
router.get("/vista/nuevo", isAuthenticated, vistaNuevoProveedorView);
router.post("/vista", isAuthenticated, vistaCrearProveedorView);
router.get("/vista/:id", isAuthenticated, vistaVerProveedorView);
router.get("/vista/:id/editar", isAuthenticated, vistaEditarProveedorView);
router.put("/vista/:id", isAuthenticated, vistaActualizarProveedorView);
router.delete("/vista/:id", isAuthenticated, vistaEliminarProveedorView);

router.get("/", listarProveedores);
router.get("/:id", obtenerProveedor);
router.post("/", crearProveedor);
router.put("/:id", actualizarProveedor);
router.delete("/:id", eliminarProveedor);

export default router;
