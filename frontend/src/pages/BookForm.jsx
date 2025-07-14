import React, { useState } from 'react';
import api from '../api/api';

// Formulario para crear libros, con campos opcionales
export default function BookForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [dewey, setDewey] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [copies, setCopies] = useState(1);

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos todos los campos, opcionales incluidos
      await api.post('/books', { title, author, isbn, dewey, category, description, copies });
      alert('Libro creado');
      onSuccess();
      // Limpiar campos tras crear
      setTitle('');
      setAuthor('');
      setIsbn('');
      setDewey('');
      setCategory('');
      setDescription('');
      setCopies(1);
    } catch (error) {
      console.error(error);
      alert('Error al crear libro');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Crear Libro</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autor"
        required
      />
      <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="ISBN"
        required
      />
      <input
        type="text"
        value={dewey}
        onChange={(e) => setDewey(e.target.value)}
        placeholder="Dewey (opcional)"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Categoría (opcional)"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
      />
      <input
        type="number"
        value={copies}
        onChange={(e) => setCopies(Number(e.target.value))}
        min="0"
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}