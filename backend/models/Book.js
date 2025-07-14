// Esquema de libro con inventario de copias y clasificación Dewey

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true },    // Título del libro
  author:      { type: String, required: true },    // Autor(es)
  isbn:        { type: String, required: true, unique: true }, // ISBN único
  dewey:       { type: String },                    // Clasificación Dewey Decimal
  category:    { type: String },                    // Categoría o género
  description: { type: String },                    // Descripción breve
  copies:      { type: Number, default: 1, min: 0 },// Total de copias
  available:   { type: Number, default: 1, min: 0 } // Copias disponibles
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);