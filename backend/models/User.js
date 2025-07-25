// Esquema de usuario con roles y estado de cuenta

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin','profesor','alumno'], default: 'alumno' },
  curso:    {
    type: String,
    required: function() { return this.role === 'alumno'; }
  }, // Curso obligatorio solo para alumnos
  active:   { type: Boolean, default: true } // Estado de la cuenta
}, { timestamps: true });

// Encriptar la contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas en el login
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);