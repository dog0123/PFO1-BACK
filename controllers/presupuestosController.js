import db from "../config/db.js";

// Calcula el total sumando el costo de todos los items.
const calcularTotal = (items) => {
  if (!items || items.length === 0) return 0;
  
  return items.reduce((acc, item) => {
    const cantidad = parseFloat(item.cantidad) || 0;
    const precio = parseFloat(item.precioUnitario) || 0;
    return acc + (cantidad * precio);
  }, 0);
};


const generarPresupuestoCompleto = (presupuesto, proveedores) => {
  if (!presupuesto || !presupuesto.items) return presupuesto;
  
  const presupuestoCompleto = { ...presupuesto };
  
  presupuestoCompleto.items = presupuestoCompleto.items.map(item => {
    const proveedor = proveedores.find(p => p.id === parseInt(item.proveedorId));
    
    return {
      ...item,
      proveedor: proveedor 
        ? { id: proveedor.id, nombre: proveedor.nombre, servicio: proveedor.servicio } 
        : { error: 'Proveedor no encontrado' },
    };
  });
  
  return presupuestoCompleto;
};

// Traer todos los presupuestos
async function traer(req, res) {
  const presupuestos = await db.getCollection("presupuestos");
  const proveedores = await db.getCollection("proveedores"); 
  
  const presupuestosCompletos = presupuestos.map(p => generarPresupuestoCompleto(p, proveedores));
  
  res.json(presupuestosCompletos);
}

// Buscar presupuesto por ID
async function obtenerPorId(req, res) {
  const id = parseInt(req.params.id); 
  
  const presupuestos = await db.getCollection("presupuestos");
  const proveedores = await db.getCollection("proveedores"); 
  
  const presupuesto = presupuestos.find((p) => p.id === id);

  if (presupuesto) {
    const presupuestoCompleto = generarPresupuestoCompleto(presupuesto, proveedores);
    res.json(presupuestoCompleto);
  } else {
    res.status(404).json({ error: "Presupuesto no encontrado" });
  }
}

// Crear nuevo presupuesto
async function crear(req, res) {
  let presupuestos = await db.getCollection("presupuestos");

  // El ID capaz en mongo se genera solo
  const nuevoId = Math.max(0, ...presupuestos.map(p => p.id)) + 1;
  
  const nuevoPresupuesto = {
    id: nuevoId,
    eventoId: parseInt(req.body.eventoId),
    nombre: req.body.nombre,
    fechaEmision: new Date().toISOString(),
    estado: req.body.estado || 'En elaboración',
    items: req.body.items || [], 
  };
  
  // Calcular el total
  nuevoPresupuesto.totalGeneral = calcularTotal(nuevoPresupuesto.items);

  // Agregar y guardar
  presupuestos.push(nuevoPresupuesto);
  await db.setCollection("presupuestos", presupuestos); // Usamos db.setCollection

  // Devolvemos presupuesto
  const proveedores = await db.getCollection("proveedores");
  const presupuestoCompleto = generarPresupuestoCompleto(nuevoPresupuesto, proveedores);

  res.status(201).json(presupuestoCompleto);
}

// Actualizar presupuesto
async function actualizar(req, res) {
  const id = parseInt(req.params.id);
  let presupuestos = await db.getCollection("presupuestos");
  const index = presupuestos.findIndex((p) => p.id === id);

  if (index !== -1) {
    let presupuestoActualizado = { ...presupuestos[index], ...req.body };
    
    // Recalcular el total
    if (req.body.items) {
      presupuestoActualizado.totalGeneral = calcularTotal(presupuestoActualizado.items);
    }

    presupuestos[index] = presupuestoActualizado;
    
    await db.setCollection("presupuestos", presupuestos);
    
    // Devolver el presupuesto
    const proveedores = await db.getCollection("proveedores");
    const presupuestoCompleto = generarPresupuestoCompleto(presupuestoActualizado, proveedores);
    res.json(presupuestoCompleto);
  } else {
    res.status(404).json({ error: "Presupuesto no encontrado" });
  }
}

// Eliminar presupuesto
async function eliminar(req, res) {
  const id = parseInt(req.params.id);
  let presupuestos = await db.getCollection("presupuestos");
  
  const filtrados = presupuestos.filter((p) => p.id !== id);

  if (presupuestos.length === filtrados.length) { 
    return res.status(404).json({ error: "Presupuesto no encontrado" });
  }

  await db.setCollection("presupuestos", filtrados);
  res.status(204).end();
}

const presupuestosController = { traer, obtenerPorId, crear, actualizar, eliminar };
export default presupuestosController;