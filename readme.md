# Eventify – Sistema de Gestión de Eventos
**Desarrollo Backend - Entrega Final**  
**Comisión: A**  
**Profesor: Emir Eliezer Garcia Ontiveros**  
**Grupo 19**  
**Integrantes Borsini, Alcira - Cervetti, Diego - Olivera, Sara - Rodriguez, Jonatan**  

---

## Proyecto: CRUD para Proveedores, Eventos y Presupuestos

Esta una aplicación web diseñada para centralizar y optimizar la gestión de eventos de la empresa de eventos Eventify.
Permite administrar clientes, proveedores, tareas, presupuestos, estados y reportes, integrando toda la información necesaria.
Este proyecto implementa un **API REST** para gestionar proveedores, eventos y los presupuestos asociados de una empresa de eventos.  
Está construido con:
- **Node.js** y **Express**,
- **MongoDB** y **Mongoose**,
- Patrón MVC con capas de servicio,
- Motor de plantillas **PUG**,
- **Bootstrap** para UI,
- Autenticación y roles (Admin / User)

---
## Modelado del Sistema
Los siguientes diagramas reflejan la implementación del patrón MVC con Capa de Servicios y las relaciones en la base de datos MongoDB. Los mismos
muestran la estructura de datos, las relaciones entre clases y el flujo de interacción principal.

1. **Diagrama de Entidad-Relación (MER):**

<img width="563" height="421" alt="1" src="https://github.com/user-attachments/assets/1be4dc22-0d4e-45a1-997b-c64989080c24" />

  
2. **Diagrama de Clases (Arquitectura MVC + Servicios):**

<img width="336" height="429" alt="2" src="https://github.com/user-attachments/assets/f826cac8-aa9d-4f94-8eff-bc25f0b52ca0" />


3. **Diagrama de Secuencia (Creación de un Evento):**

<img width="564" height="433" alt="3" src="https://github.com/user-attachments/assets/fb9e34c0-e345-4666-91de-ce5e9b8ded8f" />


---

### Estructura del proyecto
- **models/** → Evento, Cliente, Proveedor, Presupuesto, Estado, Reporte, Tarea
- **controllers/** → contiene la lógica de negocio para `proveedores`, `eventos` y **`presupuestos`**.
-   /api  → Controladores JSON (API REST)
-   /views → Controladores para renderizar vistas Pug
- **services** → Capa de lógica de negocio 
- **routes/** → define las rutas Express.
-   /api  → Endpoints JSON
-   /views → Rutas que renderizan vistas
- **views**  → Plantillas Pug
- **/public** → CSS / JS / Bootstrap
- **app.js** 
- **config** 
- **.env** 
---

## Instalación y ejecución

1. Instalar dependencias:
   ```bash
   npm install


---
## Autenticación y roles
Se implementó un módulo de autenticación con Roles: 
- **Admin**  → Crea usuarios
             → Accede a funcionalidades críticas
- **User** → Uso estándar del sistema

**Credenciales de prueba (Admin)**
     - Username: admin
     - Password: admin123

     - Seguridad: Se protegen las rutas sensibles para que solo usuarios autenticados (y con el rol adecuado) puedan acceder a funcionalidades críticas.

---

## Mejoras implementadas en esta etapa

#### 1. Separación de responsabilidades en la capa Service
* Se definió el comportamiento estándar de los métodos del Service, garantizando que tanto las rutas para views como las solicitudes JSON interactúen con la       base de datos de forma unificada.

#### 2. Limpieza de lógica en rutas
* Se eliminó toda la lógica de negocio de los archivos de rutas.
* Se crearon controladores dedicados exclusivamente a la renderización de vistas Pug (view controllers)..

#### 3. Actualización del modelo Evento
* Eliminación del módulo “invitados” ya que éstos se integran directamente en el evento como un array de objetos.
* Se eliminó la propiedad tareas del schema

#### 4. Mejoras en controladores y flujo de la app
* Ajustes generales en la lógica de los controladores de views
  
#### 5. Mejoras en vistas Pug
* Se incorporó la vista eventoCliente para poder asignar un nuevo cliente a un evento si el anterior fue eliminado.
* Se agregó la vista reporteEncuesta para permitir la carga de encuestas de satisfacción en los reportes.
    
#### 6. Eliminación de comentarios
* Se eliminaron comentarios innecesarios dentro del código de la aplicación

#### 7. Módulo de Autenticación y Roles
* Se implementó un sistema de login completo con distinción de roles (Admin y User).


---

## Deploy en Render

Las siguientes imágenes presentan la aplicación ya desplegada en Render, junto con una vista general de sus funcionalidades principales  

<table>
  <tr>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/6a5279be-d16c-4433-a765-6008f97cc3c6" width="420" alt="Login de la aplicación" />
        <figcaption><em>Login de la aplicación.</em></figcaption>
      </figure>
    </td>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/4f5137ef-df51-4530-aa9c-02f696093b31" width="420" alt="Pantalla principal" />
        <figcaption><em>Pantalla principal de la aplicación.</em></figcaption>
      </figure>
    </td>
  </tr>

  <tr>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/7cf2e98b-1594-43f1-9bbe-788d67af46d5" width="420" alt="Lista de eventos" />
        <figcaption><em>Lista general de los eventos.</em></figcaption>
      </figure>
    </td>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/2ec826f4-1852-487c-bdad-4180dd999dfb" width="420" alt="Detalle de cliente" />
        <figcaption><em>Vista de detalle de un cliente.</em></figcaption>
      </figure>
    </td>
  </tr>

  <tr>
    <td align="center">
      <figure>
        <img src="https://github.com/user-attachments/assets/bce49829-4c86-4704-b87a-8f11a65b3b87" width="420" alt="Formulario nuevo usuario" />
        <figcaption><em>Formulario para registrar un nuevo usuario.</em></figcaption>
      </figure>
    </td>
    <td></td>
  </tr>
</table>




