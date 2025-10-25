# PFO 2
**Nombre de la materia: Desarrollo Backend**  
**Comisión: A**  
**Profesor: Emir Eliezer Garcia Ontiveros**  
**Grupo 19**  
**Integrantes Borsini, Alcira - Cervetti, Diego - Olivera, Sara - Rodriguez, Jonatan**  

---

## Proyecto: CRUD para Proveedores, Eventos y Presupuestos

Este proyecto implementa un **API REST** para gestionar proveedores, eventos y los presupuestos asociados de una empresa de eventos.  
Está construido con **Node.js** y **Express**, utilizando un archivo `basedatos.json` como "base de datos" persistente (más adelante intentaremos Mongo).  

### Estructura del proyecto
- **models/** → define las entidades `Proveedor` y `Evento`.  
- **controllers/** → contiene la lógica de negocio para `proveedores`, `eventos` y **`presupuestos`**.  
- **routes/** → define las rutas Express para `/proveedores`, `/eventos` y **`/presupuestos`**.  
- **db.json** → archivo JSON que hace como base de datos.  
- **db.js** → módulo que maneja la lectura/escritura de la base de datos.  
- **app.js** → archivo principal que corre al servidor.  

---

## Instalación y ejecución
1. Instalar dependencias:  
   ```bash
   npm install
   ```

2. Iniciar el servidor:  
   ```bash
   node server.js
   ```
   El servidor quedará disponible en:  
   ```
   http://localhost:3000
   ```

---

## Endpoints disponibles

### Proveedores

#### 1. Listar todos los proveedores
GET http://localhost:3000/proveedores

![Texto alternativo](/imagenes/p01.jpg)



#### 2. Obtener un proveedor por ID
GET http://localhost:3000/proveedores/:id

![Texto alternativo](/imagenes/p02.jpg)



#### 3. Crear un nuevo proveedor
POST http://localhost:3000/proveedores

Body (JSON):
```json
{
  "nombre": "Parripollo",
  "servicio": "Catering",
  "telefono": "12345"
}
4. Actualizar un proveedor existente
PUT http://localhost:3000/proveedores/:id
Body (JSON):

JSON

{
  "telefono": "54321"
}
5. Eliminar un proveedor
DELETE http://localhost:3000/proveedores/:id
Eventos
1. Listar todos los eventos
GET http://localhost:3000/eventos
2. Obtener un evento por ID
GET http://localhost:3000/eventos/:id
3. Crear un nuevo evento
POST http://localhost:3000/eventos
Body (JSON):

JSON

{
  "nombre": "Fiesta de Fin Egresados",
  "fecha": "2025-11-29",
  "ubicacion": "Salón Cito",
  "proveedores": [1]
}
4. Actualizar un evento existente
PUT http://localhost:3000/eventos/:id
Body (JSON):

JSON

{
  "proveedores": [2]
}
5. Eliminar un evento
DELETE http://localhost:3000/eventos/:id
Presupuestos
Este módulo permite gestionar un presupuesto consolidado para un evento, el cual puede contener ítems de diferentes proveedores. El endpoint de listado y obtención por ID devuelve el presupuesto completo, resolviendo las referencias del proveedorId en cada ítem.

1. Listar todos los presupuestos
GET http://localhost:3000/presupuestos
2. Obtener un presupuesto por ID
GET http://localhost:3000/presupuestos/:id
3. Crear un nuevo presupuesto
POST http://localhost:3000/presupuestos
Body (JSON):

JSON

{
  "eventoId": 1, 
  "nombre": "Presupuesto Básico",
  "estado": "En elaboración",
  "items": [
    {
      "descripcion": "Alquiler de sillas",
      "proveedorId": 2, 
      "cantidad": 100,
      "precioUnitario": 5
    },
    {
      "descripcion": "Servicio de Catering",
      "proveedorId": 1, 
      "cantidad": 1,
      "precioUnitario": 12000
    }
  ]
}
4. Actualizar un presupuesto existente
PUT http://localhost:3000/presupuestos/:id
Body (JSON):

JSON

{
  "estado": "Aceptado",
  "items": [
    {
      "descripcion": "Alquiler de sillas y mesas",
      "proveedorId": 2, 
      "cantidad": 100,
      "precioUnitario": 7
    }
  ]
}
5. Eliminar un presupuesto
DELETE http://localhost:3000/presupuestos/:id
Interacción entre dos módulos
1. Obtener evento completo (con proveedores asociados)
GET http://localhost:3000/eventos/:id/completo
Aclaraciones
Los datos se guardan en el archivo basedatos.json que está en la carpeta config.  

La base de datos viene con proveedores y eventos de ejemplo, pero se recomienda primero crear algunos con POST para luego probar el resto de los endpoints (GET, PUT, DELETE).  

El totalGeneral de un Presupuesto se calcula automáticamente al crearlo o actualizarlo.