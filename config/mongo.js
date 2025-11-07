// config/mongo.js
// Este archivo maneja la conexión a la base de datos MongoDB
// usando Mongoose. Se llama desde app.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // carga variables del archivo .env

// URI de conexión
const MONGO_URI = process.env.MONGO_URI;

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Conectado correctamente a MongoDB en: ${MONGO_URI}`);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // termina el proceso si falla
  }
};

// Exportamos la función para que app.js la use
export default connectDB;
