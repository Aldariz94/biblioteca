
// Gestión de préstamos y devoluciones de libros

const Loan = require('../models/Loan');    // modelo Loan
const Book = require('../models/Book');    // modelo Book

// Solicitar préstamo (admin, profesor o alumno)
exports.createLoan = async (req, res) => {
  try {
    // 1) Buscar el libro
    const libro = await Book.findById(req.body.bookId);
    if (!libro || libro.available < 1) {
      return res.status(400).json({ mensaje: 'No hay copias disponibles' });
    }

    // 2) Crear el préstamo
    const prestamo = await Loan.create({
      user: req.user._id,
      book: req.body.bookId
    });

    // 3) Reducir inventario
    libro.available -= 1;
    await libro.save();

    return res.status(201).json(prestamo);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Error al crear préstamo',
      error: error.message
    });
  }
};

// Devolver préstamo (admin, profesor o alumno)
exports.returnLoan = async (req, res) => {
  try {
    // 1) Buscar el préstamo
    const prestamo = await Loan.findById(req.params.id);
    if (!prestamo) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }

    // 2) Marcar como devuelto
    prestamo.status = 'devuelto';
    prestamo.returnDate = Date.now();
    await prestamo.save();

    // 3) Incrementar inventario del libro
    const libro = await Book.findById(prestamo.book);
    if (libro) {
      libro.available += 1;
      await libro.save();
    }

    return res.json(prestamo);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Error al devolver préstamo',
      error: error.message
    });
  }
};
