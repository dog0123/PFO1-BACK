import express from 'express';
import presupuestosController from '../controllers/presupuestosController.js';

const router = express.Router();

router.get('/', presupuestosController.traer);          // GET /api/presupuestos
router.get('/:id', presupuestosController.obtenerPorId); // GET /api/presupuestos/:id
router.post('/', presupuestosController.crear);         // POST /api/presupuestos
router.put('/:id', presupuestosController.actualizar);  // PUT /api/presupuestos/:id
router.delete('/:id', presupuestosController.eliminar); // DELETE /api/presupuestos/:id

export default router;