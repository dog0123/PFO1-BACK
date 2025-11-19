// controllers/eventoController.js
import {
  crearEventoService,
  obtenerEventoPorIdService,
  actualizarEventoService,
  obtenerEventoPorIdCompletoService,
  obtenerEventosService,
  eliminarEventoService
} from "../services/eventoService.js";

import { obtenerTodosLosClientesService,  } from "../services/clienteService.js"
import {obtenerEstadoPorEventoService,
  actualizarEstadoService
} from "../services/estadoService.js"
import { 
  obtenerProveedoresPorIdsService,
  obtenerTodosLosProveedoresService
} from "../services/proveedorService.js";

import Evento from "../models/Evento.js";

// Obtener todos los eventos para el listado general
export const listarEventosView = async (req, res) => {
  try {
    const eventosBase = await obtenerEventosService();
    const eventos = await Evento.populate(eventosBase, { path: "estadoId" });

    res.render("eventos", { titulo: "Lista de Eventos", eventos });
  } catch (error) {
    console.error("Error en renderListaEventos:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mostrar formulario para crear un nuevo cliente
export const mostrarFormularioNuevoEventoView = async (req, res) => {
  try {
    const clientes = await obtenerTodosLosClientesService();

    res.render("eventoForm", {
      titulo: "Crear Evento",
      clientes
    });
  } catch (error) {
    console.error("Error al mostrar formulario:", error);
    res.status(500).send("Error al cargar formulario");
  }
};

// Crear nuevo evento
export const crearEventoView = async (req, res) => {
  try {
    await crearEventoService(req.body);
    res.redirect("/eventos/vista");
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).send("Error al crear evento");
  }
};

// Mostrar formulario para seleccionar nuevo cliente
export const seleccionarClienteView = async (req, res) => {
  try {
    const evento = await obtenerEventoPorIdService(req.params.id);
    if (!evento) return res.status(404).send("Evento no encontrado");

    const clientes = await obtenerTodosLosClientesService();

    res.render("eventoCliente", {
      titulo: "Seleccionar Nuevo Cliente",
      evento,
      clientes
    });
  } catch (error) {
    console.error("Error al cargar formulario de cliente:", error);
    res.status(500).send("Error al cargar formulario de cliente");
  }
};

// Actualizar cliente del evento
export const actualizarClienteEventoView = async (req, res) => {
  try {

    const clienteId = req.body.clienteId;
    await actualizarEventoService(req.params.id, { clienteId });
    res.redirect(`/eventos/vista/${req.params.id}`);
  } catch (error) {
    console.error("Error al actualizar cliente del evento:", error);
    res.status(500).send("Error al actualizar cliente");
  }
};

// Actualizar evento
export const actualizarEventoView = async (req, res) => {
  try {
    await actualizarEventoService(req.params.id, req.body);
    res.redirect("/eventos/vista/");
  } catch (error) {
    console.error("Error al actualizar cliente del evento:", error);
    res.status(500).send("Error al actualizar cliente");
  }
};

// Abrir pagina de evento
export const verDetalleEventoView = async (req, res) => {
  try {
    const evento = await obtenerEventoPorIdCompletoService(req.params.id);

    //Convertimos la fecha
    const fechaFormateada = evento.fecha
      ? new Date(evento.fecha).toISOString().substring(0, 10)
      : "";
    const Cliente = (await import("../models/Cliente.js")).default;
    const clientes = await Cliente.find().lean();

    res.render("eventoDetalle", {
      titulo: "Detalle del Evento",
      evento,
      clientes,
      fechaFormateada
    });
  } catch (error){
    console.error("Error al cargar evento:", error);
    res.status(500).send("Error al cargar evento");
  }
};

// Mostrar pagina de estado del evento
export const mostrarEstadoDeEventoView = async (req, res) => {
  try {
    const evento = await obtenerEventoPorIdService(req.params.id);
    if (!evento) return res.status(404).send("Evento no encontrado");

    const estado = await obtenerEstadoPorEventoService(evento._id)
    estado.historial = estado.historial.sort((a, b) => 
      new Date(b.fechaCambio) - new Date(a.fechaCambio)
    );

    res.render("eventoEstado", {
    titulo: `Estado del evento: ${evento.nombre}`,
    evento,
    estado,
  });
  } catch (error) {
    console.error("Error al cargar estado:", error);
    res.status(500).send("Error al cargar estado");
  }
}

// Actualizar estado del evento
export const actualizarEstadoDeEventoView = async (req, res) => {
  try {
    const evento = await obtenerEventoPorIdService(req.params.id);
    if (!evento) return res.status(404).send("Evento no encontrado");

    const estado = await obtenerEstadoPorEventoService(evento._id);
    await actualizarEstadoService(estado._id, req.body);

    res.redirect(`/eventos/${evento._id}/estado`);
  } catch (error) {
    console.error("Error al cargar estado:", error);
    res.status(500).send("Error al cargar estado");
  }
}

export const vistaProveedoresEventoView = async (req, res) => {
  try {
    const eventoId = req.params.id;

    // 1) Buscar el evento
    const evento = await obtenerEventoPorIdService(eventoId);
    if (!evento) return res.status(404).send("Evento no encontrado");

    const proveedoresArray = evento.proveedores || [];

    // 2) Separar proveedores vivos (ObjectId) y snapshots
    const refs = [];
    const raws = [];

    for (const item of proveedoresArray) {
      if (!item) continue;

      if (item.proveedorId) {
        refs.push(item.proveedorId.toString());
      } else {
        raws.push(item);
      }
    }

    const refsUnicos = [...new Set(refs)];

    // 3) Buscar proveedores vivos
    const proveedoresDocs = await obtenerProveedoresPorIdsService(refsUnicos);

    // Crear mapa para lookup
    const mapProveedores = {};
    proveedoresDocs.forEach(p => {
      mapProveedores[p._id.toString()] = p;
    });

    // 4) Unificar proveedores asignados (vivos + snapshots)
    const proveedoresAsignados = proveedoresArray.map(item => {
      const provId = item.proveedorId ? item.proveedorId.toString() : null;

      if (provId) {
        const doc = mapProveedores[provId];

        return {
          proveedorId: provId,
          nombreMostrar: doc ? doc.nombre : "(Proveedor no encontrado)",
          vivo: true,
          snapshot: null,
          _subdocId: item._id?.toString() || null
        };
      } else {
        return {
          proveedorId: null,
          nombreMostrar: item.nombre || "(Proveedor eliminado)",
          vivo: false,
          snapshot: {
            nombre: item.nombre || "",
            servicio: item.servicio || "",
            telefono: item.telefono || "",
            email: item.email || "",
            direccion: item.direccion || "",
            eliminado: !!item.eliminado,
            eliminadoEn: item.eliminadoEn || null
          },
          _subdocId: item._id?.toString() || null
        };
      }
    });

    // 5) Proveedores disponibles (todos los vivos NO asignados)
    const todos = await obtenerTodosLosProveedoresService();
    const idsAsignados = refsUnicos;

    const proveedoresDisponibles = todos.filter(
      p => !idsAsignados.includes(p._id.toString())
    );

    // 6) Render de la vista
    res.render("eventoProveedores", {
      titulo: `Proveedores de ${evento.nombre}`,
      evento,
      proveedoresAsignados,
      proveedoresDisponibles
    });

  } catch (error) {
    console.error("Error en vistaProveedoresEvento:", error);
    res.status(500).send("Error al cargar proveedores del evento");
  }
};

export const agregarProveedorEventoView = async (req,res) => {
  try {
    const eventoId = req.params.id;
    const { proveedorId } = req.body;
    if (!proveedorId) {
      return res.redirect(`/eventos/${eventoId}/proveedores`);
    }

    const evento = await obtenerEventoPorIdService(eventoId);
    if (!evento) return res.status(404).send("Evento no encontrado");

    evento.proveedores.push({
      proveedorId,
      eliminado: false,
      eliminadoEn: null
    });
    await actualizarEventoService(eventoId, { proveedores: evento.proveedores });

    res.redirect(`/eventos/${eventoId}/proveedores`);
  } catch (error) {
    console.error("Error al agregar proveedor al evento:", error);
    res.status(500).send("Error al agregar proveedor");
  }
}

export const quitarProveedorEventoView = async (req, res) => {
  try {
    const { id: eventoId, proveedorId, nombreMostrar } = req.params;

    const evento = await obtenerEventoPorIdService(eventoId);
    if (!evento) return res.status(404).send("Evento no encontrado");

    let nuevosProveedores = evento.proveedores;

    // Caso proveedor vivo
    if (proveedorId && proveedorId !== "null") {
      nuevosProveedores = nuevosProveedores.filter(
        p => p.proveedorId?.toString() !== proveedorId
      );
    } 
    // Caso snapshot
    else {
      nuevosProveedores = nuevosProveedores.filter(
        p => p.nombre !== nombreMostrar
      );
    }
    // Guardamos usando el service
    await actualizarEventoService(eventoId, { proveedores: nuevosProveedores });
    res.redirect(`/eventos/${eventoId}/proveedores`);
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    res.status(500).send("Error al eliminar proveedor");
  }
};

export const mostrarInvitadosView = async (req, res) => {
  try {
    const evento = await obtenerEventoPorIdService(req.params.id);

    if (!evento) return res.status(404).send("Evento no encontrado");

    res.render("eventoInvitados", {
      titulo: `Invitados de ${evento.nombre}`,
      evento
    });
  } catch (error) {
    console.error("Error al cargar invitados del evento:", error);
    res.status(500).send("Error al cargar los invitados del evento");
  }
};

export const agregarInvitadoView = async (req, res) => {
  try {
    const { nombre, contacto } = req.body;

    const evento = await obtenerEventoPorIdService(req.params.id);
    if (!evento) return res.status(404).send("Evento no encontrado");

    const nuevosInvitados = [...(evento.invitados || []), { nombre, contacto }];

    await actualizarEventoService(req.params.id, { invitados: nuevosInvitados });

    res.redirect(`/eventos/${req.params.id}/invitados`);
  } catch (error) {
    console.error("Error al agregar invitado:", error);
    res.status(500).send("Error al agregar invitado");
  }
};

export const eliminarInvitadoView = async (req, res) => {
  try {
    const { eventoId, index } = req.params;

    const evento = await obtenerEventoPorIdService(eventoId);
    if (!evento) return res.status(404).send("Evento no encontrado");

    const nuevosInvitados = [...evento.invitados];
    nuevosInvitados.splice(index, 1);

    await actualizarEventoService(eventoId, { invitados: nuevosInvitados });

    res.redirect(`/eventos/${eventoId}/invitados`);
  } catch (error) {
    console.error("Error al eliminar invitado:", error);
    res.status(500).send("Error al eliminar invitado");
  }
};

export const eliminarEventoView = async (req, res) => {
  try {
    const id = req.params.id;
    const resultado = await eliminarEventoService(id);
    if (!resultado) {
      return res.status(404).send("Evento no encontrado");
    }
    res.redirect("/eventos/vista");
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).send("Error al eliminar el evento");
  }
};