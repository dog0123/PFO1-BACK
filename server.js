// Correr este archivo con el comando node server.js en la terminal

const express = require("express");
const bodyParser = require("body-parser"); // porque la base de datos es un archivo JSON
const proveedorRoutes = require("./routes/proveedores");

const app = express();
app.use(bodyParser.json());

// Rutas
app.use("/proveedores", proveedorRoutes);

// Arranca el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor arriba en http://localhost:${PORT}`);
});
