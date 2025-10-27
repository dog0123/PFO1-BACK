// Correr este archivo con el comando node server.js en la terminal

import express from 'express';
import proveedorRoutes from './routes/proveedores.js';
import eventoRoutes from './routes/eventos.js';
import clienteRoutes from './routes/clientes.js';
import db from './config/db.js';

const app = express();

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
});


app.post('/eventos', async (req,res) => {
  const eventos = await db.getCollection("eventos");
  res.render('eventos', {eventos});
});

app.post('/proveedores', async (req, res) => {
  const proveedores = await db.getCollection('proveedores');
  res.render('proveedores', {proveedores});
});

app.post('/clientes', async(req, res) => {
  const clientes = await db.getCollection('clientes');
  res.render('clientes', {clientes});
})

// Rutas
app.use("/proveedores", proveedorRoutes);
app.use("/eventos", eventoRoutes);
app.use("/clientes", clienteRoutes);

// Arranca el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor arriba en http://localhost:${PORT}`);
});

