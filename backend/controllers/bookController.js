// Gestión de catálogo de libros

const BookCtrl = require('../models/Book');

exports.getBooks = async (req, res) => res.json(await BookCtrl.find());

exports.createBook = async (req, res) => {
  try {
    const data = req.body;
    if (data.copies && data.available === undefined) data.available = data.copies;
    const libro = await BookCtrl.create(data);
    res.status(201).json(libro);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear libro', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const libro = await BookCtrl.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!libro) return res.status(404).json({ mensaje: 'Libro no encontrado' });
    res.json(libro);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar libro', error: error.message });
h}
};

// Eliminar libro (solo admin)
exports.deleteBook = async (req, res) => {
  try {
    // Buscar si existe el libro
    const libro = await BookCtrl.findById(req.params.id);
    if (!libro) return res.status(404).json({ mensaje: 'Libro no encontrado' });
    // Eliminar usando el modelo directamente
    const result = await BookCtrl.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(400).json({ mensaje: 'No se pudo eliminar el libro' });
    }
    return res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar libro', error: error.message });
  }
};
