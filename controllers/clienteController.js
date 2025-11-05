import { json } from 'express';
import db from '../config/db.js';
import Cliente from '../models/Cliente.js';

//GET Cliente
async function traer(req, res) {
    const clientes = await db.getCollection("clientes");
    res.json(clientes);
}

async function obtenerPorId(req, res) {
    const id = parseInt(req.params.id);
    const clientes = await db.getCollection("clientes");
    const cliente = clientes.find((c) => c.id === id);

    if(cliente){
        res.json(cliente);
    }else {
        res.status(404).json({ error: "Cliente no encontrado" });  
    }
}

async function crear(req, res) {
    const clientes = await db.getCollection("clientes");
    const nuevoCliente = new Cliente(req.body);
    clientes.push(nuevoCliente);

    db.setCollection("clientes", clientes);
    res.status(201).json(nuevoCliente);
}

async function actualizar(req, res) {
    const id = parseInt(req.params.id);
    let clientes = await db.getCollection("clientes");
    const index = clientes.findIndex((c) => c.id === id);

    if(index !== -1){
        clientes[index] = { ...clientes[index], ...req.body };
        db.setCollection("clientes", clientes);
        res.json(clientes[index]);
    }else{
        res.status(404).json( {error: "Cliente no encontrado"});
    }
}

async function eliminar(req, res) {
    const id = parseInt(req.params.id);
    let clientes = await db.getCollection("clientes");
    const filtrados = clientes.filter((c) => c.id !== id);

    if(clientes.length === filtrados.length){
        return res.status(404).json( {error: "cliente no encontrado"} );
    }

    db.setCollection("clientes", filtrados);
    res.status(204).end();
}

async function traerConEventos(req, res) {
    const clientes = await db.getCollection("clientes");
    const eventos = await db.getCollection("eventos");

    const clientesCompletos = clientes.map(cliente => {
        const eventosAsignados = cliente.eventos.map(id =>
            eventos.find((e) => e.id === id)
        ).filter((e) => e !== undefined);

        return {
            ...cliente,
            eventos: eventosAsignados
        };
    }
    );
    res.json(clientesCompletos);
}

async function obtenerClienteCompleto(req, res) {
    const id = parseInt(req.params.id);
    const clientes = await db.getCollection("clientes");
    const eventos = await db.getCollection("eventos");

    const cliente = clientes.find((c) => c.id === id);

    if(!cliente){
        return res.status(404).json( {error: "Cliente no encontrado"} );
    }

    const eventosAsignados = cliente.eventos.map(id =>
        eventos.find((e) => e.id === id)
    ).filter((p) => p.id !== undefined);

    const clienteCompleto = {
        ...cliente,
        evento: eventosAsignados
    };

    res.json(clienteCompleto);
}

const clienteController = {
    traer,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    traerConEventos,
    obtenerClienteCompleto
}

export default clienteController;

