// Correr este archivo con el comando node server.js en la terminal

import express from 'express';
import proveedorRoutes from './routes/proveedores.js';
import eventoRoutes from './routes/eventos.js';
import db from './config/db.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/eventos', (req,res) => {
  const eventos = db.getCollection("eventos");
  res.render('eventos', {eventos});
});
// Rutas
app.use("/proveedores", proveedorRoutes);
app.use("/eventos", eventoRoutes);

// Arranca el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor arriba en http://localhost:${PORT}`);
});

