// app.js

import express from 'express';
import 'dotenv/config'; // carga variables del archivo .env
import connectDB from './config/mongo.js'; // conexión a Mongo
import db from './config/db.js'; // conexión antigua JSON (para compatibilidad)
import methodOverride from "method-override";


// Importa las rutas de TODOS los módulos hechos
import proveedorRoutes from './routes/proveedores.js';
import eventoRoutes from './routes/eventos.js';
import presupuestoRoutes from './routes/presupuestos.js';
import tareasRoutes from './routes/tareas.js';
import clienteRoutes from './routes/clientes.js'; 
import invitadoRoutes from './routes/invitados.js';
import estadoRoutes from "./routes/estados.js";
import reporteRoutes from "./routes/reportes.js";


const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Motor de plantillas PUG
app.set('view engine', 'pug');
app.set('views', './views');

// Verifica si se debe conectar a Mongo o seguir con JSON
if (process.env.USE_MONGO === 'true') {
  await connectDB(); // usa tu config/mongo.js
  console.log('Conectado a MongoDB con Mongoose');
} else {
  console.log('Usando base de datos local JSON (modo compatibilidad)');
}

// Rutas principales (usar Mongo o JSON según el módulo, hasta tanto pasemos todo)
app.use('/proveedores', proveedorRoutes);
app.use('/eventos', eventoRoutes);
app.use('/presupuestos', presupuestoRoutes);
app.use('/tareas', tareasRoutes);
app.use('/clientes', clienteRoutes);
app.use('/invitados', invitadoRoutes);
app.use("/estados", estadoRoutes);
app.use("/reportes", reporteRoutes);


// Ruta raíz
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Eventify - Gestión de eventos' });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
