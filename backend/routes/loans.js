// backend/routes/loans.js
const express = require('express');
const router = express.Router();
const { createLoan, returnLoan } = require('../controllers/loanController');
const protect = require('../middleware/authMiddleware');

// Permitir a admin, profesor o alumno
function allowLoanRoles(req, res, next) {
  if (['admin','profesor','alumno'].includes(req.user.role)) return next();
  return res.status(403).json({ mensaje: 'Acceso restringido: admin, profesores y alumnos' });
}

// Solicitar préstamo
router.post('/', protect, allowLoanRoles, createLoan);

// Devolver préstamo
router.put('/:id/return', protect, allowLoanRoles, returnLoan);

module.exports = router;
