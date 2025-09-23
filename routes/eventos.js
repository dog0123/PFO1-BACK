import express from 'express'
import eventoController from "../controllers/eventoController.js";

const router = express.Router();

router.get("/", eventoController.traer);
router.get("/completos", eventoController.traerConProveedores);
router.get("/:id/completo", eventoController.obtenerEventoCompleto);
router.get("/:id", eventoController.obtenerPorId);
router.post("/", eventoController.crear);
router.put("/:id", eventoController.actualizar);
router.delete("/:id", eventoController.eliminar);

export default router;
