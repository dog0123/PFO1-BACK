import db from '../config/db';
import Cliente from '../models/Cliente';

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
        db.setCollection(clientes[index]);
    }else{
        res.status(404).json( {error: "Cliente no encontrado"});
    }
}

