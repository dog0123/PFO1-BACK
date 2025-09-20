// Correr este archivo con el comando node server.js en la terminal

const express = require("express");
const bodyParser = require("body-parser"); // porque la base de datos es un archivo JSON
const proveedorRoutes = require("./routes/proveedores");
const eventoRoutes = require("./routes/eventos");
const db = require("./config/db");

const app = express();
app.use(bodyParser.json());

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