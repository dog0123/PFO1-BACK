import express from 'express';
import clienteController from '../controllers/clienteController';

const router = express.Router();

router.get("/", clienteController.traer);
router.get("/completos", clienteController.traerConEventos);
router.get(":id/completo", clienteController.obtenerClienteCompleto);
router.get("/:id", clienteController.obtenerPorId);

router.post("/", clienteController.crear);
router.put("/:id", clienteController.actualizar);
router.delete("/:id", clienteController.eliminar);

export default router;

