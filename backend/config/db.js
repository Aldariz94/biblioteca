// Gestión de conexión a MongoDB con Mongoose
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error.message);
    process.exit(1);  // Salir si no se puede conectar
  }
}

module.exports = connectDB;