// Control de acceso por rol

exports.onlyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ mensaje: 'Acceso restringido: administradores' });
  next();
};
exports.onlyProfesor = (req, res, next) => {
  if (req.user.role !== 'profesor') return res.status(403).json({ mensaje: 'Acceso restringido: profesores' });
  next();
};
exports.onlyAlumno = (req, res, next) => {
  if (req.user.role !== 'alumno') return res.status(403).json({ mensaje: 'Acceso restringido: alumnos' });
  next();
};
exports.onlyAlumnoOrProfesor = (req, res, next) => {
  if (!['alumno','profesor'].includes(req.user.role)) return res.status(403).json({ mensaje: 'Acceso restringido: alumnos y profesores' });
  next();
};