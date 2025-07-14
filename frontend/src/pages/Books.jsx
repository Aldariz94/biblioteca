import React, { useEffect, useState } from 'react';
import api from '../api/api';
import BookForm from './BookForm';

// Página que muestra el catálogo de libros y permite crear/eliminar
export default function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  // Obtiene la lista de libros desde el backend
  const fetchBooks = async () => {
    try {
      const { data } = await api.get('/books');
      setBooks(data);
    } catch {
      setError('No se pudo cargar el catálogo de libros');
    }
  };

  // Al montar el componente, llamamos a fetchBooks
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container">
      <h1>Catálogo de Libros</h1>
      {error && <p className="error">{error}</p>}
      {/* Formulario para crear nuevos libros */}
      <BookForm onSuccess={fetchBooks} />
      <ul>
        {/* Listado de libros con opción de eliminar */}
        {books.map(b => (
          <li key={b._id}>
            <strong>{b.title}</strong> — {b.author}
            {/* Campos opcionales */}
            {b.isbn && <div>ISBN: {b.isbn}</div>}
            {b.dewey && <div>Dewey: {b.dewey}</div>}
            {b.category && <div>Categoría: {b.category}</div>}
            {b.description && <div>Descripción: {b.description}</div>}
            <div>Copias totales: {b.copies} (Disponibles: {b.available})</div>
            <button onClick={() => api.delete(`/books/${b._id}`).then(fetchBooks)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
