import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

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
    process.exit(1); 
  }
};

export default connectDB;
