// Lógica de registro y login de usuarios

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar token JWT válido por 30 días
const authToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Registro de usuario (admin crea profesores/alumnos)
exports.register = async (req, res) => {
  const { name, email, password, role, curso } = req.body;
  try {
    const user = await User.create({ name, email, password, role, curso });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, curso: user.curso, token: authToken(user._id) });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error en registro', error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });  
    if (!user) return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    if (!user.active) return res.status(403).json({ mensaje: 'Cuenta desactivada, contacte al administrador' });
    if (await user.matchPassword(password)) {
      res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, curso: user.curso, token: authToken(user._id) });
    } else {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en autenticación', error: error.message });
  }
};
