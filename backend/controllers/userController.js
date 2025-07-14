// Gestión de perfil y baja de usuarios

const UserCtrl = require('../models/User');
const LoanCtrl = require('../models/Loan');

exports.getProfile = (req, res) => res.json(req.user);

// Dar de baja usuario (solo admin, sin préstamos activos, no eliminar otros admins)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    // No permitir desactivar a otro admin
    if (user.role === 'admin') {
      return res.status(403).json({ mensaje: 'No está permitido eliminar o desactivar a otro administrador' });
    }
    // Verificar préstamos activos
    const prestamosAct = await Loan.find({ user: user._id, status: 'activo' });
    if (prestamosAct.length > 0) {
      return res.status(400).json({ mensaje: 'Usuario tiene préstamos activos y no puede darse de baja' });
    }
    user.active = false;  // marcar inactivo en lugar de eliminar
    await user.save();
    res.json({ mensaje: 'Usuario desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dar de baja usuario', error: error.message });
  }
};