// backend/routes/recursos.js
const express = require('express');
const router = express.Router();
const { getRecursos, createRecurso, updateRecurso, deleteRecurso } = require('../controllers/recursoController');
const protect = require('../middleware/authMiddleware');
const { onlyAdmin, onlyProfesor } = require('../middleware/roleMiddleware');

// Listar recursos (solo profesor o admin)
router.get('/', protect, (req, res, next) => {
  if (['profesor','admin'].includes(req.user.role)) return next();
  return res.status(403).json({ mensaje: 'Acceso restringido: profesores y administradores' });
}, getRecursos);

// Crear / Actualizar / Eliminar recurso (solo admin)
router.post('/',   protect, onlyAdmin, createRecurso);
router.put('/:id', protect, onlyAdmin, updateRecurso);
router.delete('/:id', protect, onlyAdmin, deleteRecurso);

module.exports = router;
