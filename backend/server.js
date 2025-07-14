// Punto de entrada de la aplicación: configura Express, middlewares y rutas.

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // Función para conectar a MongoDB

// 1. Cargar variables de entorno desde .env
dotenv.config();

// 2. Conectar a la base de datos MongoDB
connectDB();

const app = express();

// 3. Middlewares globales
app.use(express.json());                             // Parsear JSON en el body
app.use(cors({ origin: 'http://localhost:5173' }));  // Permitir solicitudes desde el frontend

// 4. Rutas de la API
app.use('/api/auth', require('./routes/auth'));      // Autenticación (registro/login)
app.use('/api/users', require('./routes/users'));    // Perfil y gestión de usuarios
app.use('/api/books', require('./routes/books'));    // Catálogo de libros
app.use('/api/loans', require('./routes/loans'));    // Préstamos de libros
app.use('/api/recursos', require('./routes/recursos')); // Catálogo de recursos internos

// 5. Arrancar servidor en puerto configurado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
