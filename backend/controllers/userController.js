// Gestión de perfil y baja de usuarios

const UserCtrl = require('../models/User');
const LoanCtrl = require('../models/Loan');

exports.getProfile = (req, res) => res.json(req.user);

// Eliminar usuario de forma permanente (si no es admin ni tiene préstamos activos)
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserCtrl.findById(req.params.id);
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    if (user.role === 'admin') {
      return res.status(403).json({ mensaje: 'No está permitido eliminar a otro administrador' });
    }

    const prestamosAct = await LoanCtrl.find({ user: user._id, status: 'activo' });
    if (prestamosAct.length > 0) {
      return res.status(400).json({ mensaje: 'Usuario tiene préstamos activos y no puede ser eliminado' });
    }

    await UserCtrl.findByIdAndDelete(req.params.id); // 🔥 Elimina el documento
    res.json({ mensaje: 'Usuario eliminado permanentemente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
};


// Listar todos los usuarios (solo para admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await UserCtrl.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};


// Crear nuevo usuario (solo para admin)
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, curso } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password || !role) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    // Verificar si ya existe un usuario con ese email
    const existing = await UserCtrl.findOne({ email });
    if (existing) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Crear usuario
    const nuevoUsuario = new UserCtrl({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      curso: role === 'alumno' ? curso : undefined // solo alumnos llevan curso
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role, curso } = req.body;

    const user = await UserCtrl.findById(req.params.id);
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Actualizamos campos si vienen
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (role === 'alumno') user.curso = curso;
    else user.curso = undefined;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
};


