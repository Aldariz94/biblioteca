// Gestión del catálogo de recursos internos

const RecursoCtrl = require('../models/Recurso');

// Listar recursos (profesor o admin)
exports.getRecursos = async (req, res) => {
  const recursos = await RecursoCtrl.find();
  res.json(recursos);
};

// Crear recurso (solo admin)
exports.createRecurso = async (req, res) => {
  try {
    const data = req.body;
    if (data.total && data.disponible === undefined) data.disponible = data.total;
    const recurso = await RecursoCtrl.create(data);
    res.status(201).json(recurso);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear recurso', error: error.message });
  }
};

// Actualizar recurso (solo admin)
exports.updateRecurso = async (req, res) => {
  try {
    const recurso = await RecursoCtrl.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recurso) return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    res.json(recurso);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar recurso', error: error.message });
  }
};

// Eliminar recurso (solo admin)
exports.deleteRecurso = async (req, res) => {
  try {
    // 1) Verificamos que el recurso exista
    const recurso = await RecursoCtrl.findById(req.params.id);
    if (!recurso) {
      return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    }

    // 2) Eliminamos usando deleteOne sobre el modelo
    const result = await RecursoCtrl.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(400).json({ mensaje: 'No se pudo eliminar el recurso' });
    }

    // 3) Respondemos con éxito
    return res.json({ mensaje: 'Recurso eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar recurso', error: error.message });
  }
};
