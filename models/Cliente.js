import db from '../config/db';

function generarIdCliente(){
    const clientes = db.getCollection('clientes');
    const idClientes = clientes.map(c => c.id);
    return idClientes.length > 0 ? Math.max(...idClientes) + 1 : 1;
}

class Cliente {
    constructor( {nombre, telefono, email, eventos = []} ){
        this.id = generarIdCliente();
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.eventos = eventos; 
    }
}

export default Cliente;