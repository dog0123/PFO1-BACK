# PFO 1  
**Nombre de la materia: Desarrollo Backend**  
**Comisión: A**  
**Profesor: Emir Eliezer Garcia Ontiveros**  
**Grupo 19**  
**Integrantes Borsini, Alcira - Cervetti, Diego - Olivera, Sara - Rodriguez, Jonatan**  

---

## Proyecto: CRUD para Proveedores de la Empresa de Eventos  

Este proyecto implementa un **API REST** para gestionar proveedores y eventos de una empresa de eventos.  
Está construido con **Node.js** y **Express**, utilizando un archivo `basedatos.json` como "base de datos" persistente (más adelante intentaremos Mongo).  

### Estructura del proyecto
- **models/** → define las entidades `Proveedor` y `Evento`.  
- **controllers/** → contiene la lógica de negocio para `proveedores` y `eventos`.  
- **routes/** → define las rutas Express para `/proveedores` y `/eventos`.  
- **db.json** → archivo JSON que hace como base de datos.  
- **db.js** → módulo que maneja la lectura/escritura de la base de datos.  
- **server.js** → archivo principal que corre al servidor.  

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
```
GET http://localhost:3000/proveedores
```
![Texto alternativo](/imagenes/p01.jpg)



#### 2. Obtener un proveedor por ID
```
GET http://localhost:3000/proveedores/:id
```
![Texto alternativo](/imagenes/p02.jpg)



#### 3. Crear un nuevo proveedor
```
POST http://localhost:3000/proveedores
```
Body (JSON):
```json
{
  "nombre": "Parripollo",
  "servicio": "Catering",
  "telefono": "12345"
}
```
![Texto alternativo](/imagenes/p03.jpg)



#### 4. Actualizar un proveedor existente
```
PUT http://localhost:3000/proveedores/:id
```
Body (JSON):
```json
{
  "telefono": "54321"
}
```
![Texto alternativo](/imagenes/p04.jpg)



#### 5. Eliminar un proveedor
```
DELETE http://localhost:3000/proveedores/:id
```
![Texto alternativo](/imagenes/p05.jpg)



---


### Eventos

#### 1. Listar todos los eventos
```
GET http://localhost:3000/eventos
```
![Texto alternativo](/imagenes/e02.jpg)



#### 2. Obtener un evento por ID
```
GET http://localhost:3000/eventos/:id
```
![Texto alternativo](/imagenes/e03.jpg)

#### 3. Crear un nuevo evento
```
POST http://localhost:3000/eventos
```
Body (JSON):
```json
{
  "nombre": "Fiesta de Fin Egresados",
  "fecha": "2025-11-29",
  "ubicacion": "Salón Cito",
  "proveedores": [1]
}
```
![Texto alternativo](/imagenes/e01.jpg)

#### 4. Actualizar un evento existente
```
PUT http://localhost:3000/eventos/:id
```
Body (JSON):
```json
{
  "proveedores": [2]
}
```
![Texto alternativo](/imagenes/e04.jpg)

#### 5. Eliminar un evento
```
DELETE http://localhost:3000/eventos/:id
```
![Texto alternativo](/imagenes/e05.jpg)


### Interacción entre dos módulos
#### 1. Obtener evento completo (con proveedores asociados)
```
GET http://localhost:3000/eventos/:id/completo
```
![Texto alternativo](/imagenes/ep01.jpg)

---

## Aclaraciones
- Los datos se guardan en el archivo `basedatos.json` que está en la carpeta `config`.  
- La base de datos viene con proveedores y eventos de ejemplo, pero se recomienda primero crear algunos con `POST` para luego probar el resto de los endpoints (`GET`, `PUT`, `DELETE`).  
