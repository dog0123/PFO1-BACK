// controllers/presupuestosController.js
import Presupuesto from "../models/Presupuesto.js";

// Calcula el total sumas de cantidad * precioUnitario
const calcularTotal = (items) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((acc, item) => {
    const cantidad = parseFloat(item.cantidad) || 0;
    const precio = parseFloat(item.precioUnitario) || 0;
    return acc + cantidad * precio;
  }, 0);
};

// Calcular ingresos, gastos y saldo
const calcularDetallesFinancieros = (items) => {
  const totalGastos = items
    .filter(item => item.tipo === "gasto")
    .reduce((a, i) => a + (i.cantidad * i.precioUnitario), 0);

  const totalIngresos = items
    .filter(item => item.tipo === "ingreso")
    .reduce((a, i) => a + (i.cantidad * i.precioUnitario), 0);

  const saldo = totalIngresos - totalGastos;

  return { totalGastos, totalIngresos, saldo };
};

// Listar todos los presupuestos
export const listarPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find()
      .populate("eventoId")
      .populate("items.proveedorId")
      .populate("items.clienteId");

    res.status(200).json(presupuestos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar presupuestos", error });
  }
};

// Obtener un presupuesto por ID
export const obtenerPresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findById(req.params.id)
      .populate("eventoId")
      .populate("items.proveedorId")
      .populate("items.clienteId");

    if (!presupuesto)
      return res.status(404).json({ mensaje: "Presupuesto no encontrado" });

    res.status(200).json(presupuesto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener presupuesto", error });
  }
};

// Crear un nuevo presupuesto con fecha y resumen financiero
export const crearPresupuesto = async (req, res) => {
  try {
    const nuevo = new Presupuesto(req.body);

    // Asigna fecha automática
    nuevo.fechaEmision = new Date();

    // Calcula totales
    nuevo.totalGeneral = calcularTotal(req.body.items);
    const { totalGastos, totalIngresos, saldo } = calcularDetallesFinancieros(req.body.items);

    await nuevo.save();

    res.status(201).json({
      mensaje: "Presupuesto creado correctamente",
      fechaEmision: nuevo.fechaEmision,
      totalGeneral: nuevo.totalGeneral,
      totalGastos,
      totalIngresos,
      saldo,
      presupuesto: nuevo
    });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear presupuesto", error });
  }
};

// Actualizar presupuesto existente (recalcula totales si cambian los ítems)
export const actualizarPresupuesto = async (req, res) => {
  try {
    const actualizado = await Presupuesto.findById(req.params.id);

    if (!actualizado)
      return res.status(404).json({ mensaje: "Presupuesto no encontrado" });

    // Actualiza totales
    Object.assign(actualizado, req.body);
    if (req.body.items) {
      actualizado.totalGeneral = calcularTotal(req.body.items);
      const { totalGastos, totalIngresos, saldo } = calcularDetallesFinancieros(req.body.items);
      actualizado.totalGastos = totalGastos;
      actualizado.totalIngresos = totalIngresos;
      actualizado.saldo = saldo;
    }

    await actualizado.save();

    res.status(200).json({
      mensaje: "Presupuesto actualizado correctamente",
      fechaEmision: actualizado.fechaEmision,
      totalGeneral: actualizado.totalGeneral,
      totalGastos: actualizado.totalGastos,
      totalIngresos: actualizado.totalIngresos,
      saldo: actualizado.saldo,
      presupuesto: actualizado
    });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar presupuesto", error });
  }
};

// Eliminar un presupuesto
export const eliminarPresupuesto = async (req, res) => {
  try {
    const eliminado = await Presupuesto.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ mensaje: "Presupuesto no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar presupuesto", error });
  }
};
