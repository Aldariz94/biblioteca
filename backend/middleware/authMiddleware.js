// Verificación de token JWT y carga de usuario

const jwt = require('jsonwebtoken');
const UserCtrlAuth = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserCtrlAuth.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ mensaje: 'Token inválido' });
    }
  } else {
    res.status(401).json({ mensaje: 'No autorizado, no token' });
  }
};

module.exports = protect;

