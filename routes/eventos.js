const express = require("express");
const router = express.Router();
const eventoController = require("../controllers/eventoController");

router.get("/", eventoController.traer);
router.get("/completos", eventoController.traerConProveedores);
router.get("/:id/completo", eventoController.obtenerEventoCompleto);
router.get("/:id", eventoController.obtenerPorId);
router.post("/", eventoController.crear);
router.put("/:id", eventoController.actualizar);
router.delete("/:id", eventoController.eliminar);

module.exports = router;
