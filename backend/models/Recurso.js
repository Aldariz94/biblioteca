// Esquema de recursos internos (juegos, tablets…)

const mongoose = require('mongoose');

const recursoSchema = new mongoose.Schema({
  nombre:      { type: String, required: true },
  tipo:        { type: String, required: true },
  codigo:      { type: String, unique: true },
  descripcion: { type: String },
  total:       { type: Number, default: 1, min: 0 },
  disponible:  { type: Number, default: 1, min: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Recurso || mongoose.model('Recurso', recursoSchema);
