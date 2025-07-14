const express = require('express');
const routerBooks = express.Router();
const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const protectBooks = require('../middleware/authMiddleware');
const { onlyAdmin } = require('../middleware/roleMiddleware');
routerBooks.get('/', getBooks);
routerBooks.post('/', protectBooks, onlyAdmin, createBook);
routerBooks.put('/:id', protectBooks, onlyAdmin, updateBook);
routerBooks.delete('/:id', protectBooks, onlyAdmin, deleteBook);

module.exports = routerBooks;