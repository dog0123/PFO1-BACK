# PFO 1  
**Nombre de la materia: Desarrollo Backend**  
**Comisión: A**  
**Profesor: Emir Eliezer Garcia Ontiveros**  
**Grupo 19**  
**Integrantes Borcini, Alcira - Cervetti, Diego - Olivera, Sara - Rodriguez, Jonatan**  

---

## Proyecto: CRUD para Proveedores de la Empresa de Eventos  

Este proyecto implementa un **API REST** para gestionar proveedores de una empresa de eventos.  
Está construido con **Node.js** y **Express**, utilizando un archivo `basedatos.json` como "base de datos" persistente (más adelante intentaremos Mongo).  

### Estructura del proyecto
- **models/** → define entidad `Proveedor`.  
- **controllers/** → la lógica de negocio (CRUD de proveedores por ahora).  
- **routes/** → define las rutas Express para `/proveedores`.  
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

### 1. Listar todos los proveedores
```
GET http://localhost:3000/proveedores
```

### 2. Obtener un proveedor por ID
```
GET http://localhost:3000/proveedores/:id
```

### 3. Crear un nuevo proveedor
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

### 4. Actualizar un proveedor existente
```
PUT http://localhost:3000/proveedores/:id
```
Body (JSON):
```json
{
  "telefono": "54321"
}
```

### 5. Eliminar un proveedor
```
DELETE http://localhost:3000/proveedores/:id
```

---

## Uso con Thunder Client (recomendado)

1. Instalar la extensión **Thunder Client** en VS Code.  
2. Importar la colección que está en el archivo [`thunder-proveedores.json`](./thunder-proveedores.json).  
3. Ejecutar las requests incluidas:  

- **GET** → Listar proveedores  
- **POST** → Crear proveedor  
- **GET** → Obtener proveedor por ID  
- **PUT** → Actualizar proveedor  
- **DELETE** → Eliminar proveedor  

---

## Aclaraciones
- Los datos se guardan en el archivo `basedatos.json` que está en la carpeta `config`.
- La base de datos viene con 2 proveedores pre-cargados pero se recomienda primero crear un proveedor (usando el POST) y luego usar la `id` para probar los demás endpoints (GET, PUT, DELETE).  
