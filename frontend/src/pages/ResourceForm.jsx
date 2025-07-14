import React, { useState } from 'react';
import api from '../api/api';
export default function ResourceForm({ onSuccess }) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [total, setTotal] = useState(1);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/recursos', { nombre, tipo, codigo, total });
      alert('Recurso creado');
      onSuccess();
    } catch {
      alert('Error al crear recurso');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Crear Recurso</h2>
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
      <input value={tipo} onChange={e => setTipo(e.target.value)} placeholder="Tipo" required />
      <input value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Código" required />
      <input type="number" value={total} onChange={e => setTotal(+e.target.value)} min="1" required />
      <button type="submit">Guardar</button>
    </form>
  );
}
