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
