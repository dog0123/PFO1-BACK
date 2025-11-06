// routes/invitados.js
import express from "express";
import {
  listarInvitados,
  listarPorEvento,
  obtenerInvitado,
  crearInvitado,
  actualizarInvitado,
  eliminarInvitado,
  confirmarAsistencia,
  registrarEntrada
} from "../controllers/invitadosController.js";

const router = express.Router();

// Endpoints CRUD principales
router.get("/", listarInvitados);                    // Lista de todos los invitados
router.get("/:id", obtenerInvitado);                 // Ver un invitado en especial
router.post("/", crearInvitado);                     // Crear nuevo
router.put("/:id", actualizarInvitado);              // Actualizar
router.delete("/:id", eliminarInvitado);             // Eliminar

// Extras: relaciones y cambios de estado
router.get("/evento/:eventoId", listarPorEvento);    // Listar invitados de un evento
router.put("/:id/confirmar", confirmarAsistencia);   // Confirmar asistencia
router.put("/:id/asistio", registrarEntrada);        // Registrar entrada

export default router;
