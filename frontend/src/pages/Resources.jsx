import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ResourceForm from './ResourceForm';
export default function Resources() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const fetch = async () => {
    try {
      const { data } = await api.get('/recursos');
      setItems(data);
    } catch {
      setError('No se pudo cargar recursos');
    }
  };
  useEffect(() => { fetch(); }, []);
  return (
    <div className="container">
      <h1>Recursos Internos</h1>
      {error && <p className="error">{error}</p>}
      <ResourceForm onSuccess={fetch} />
      <ul>
        {items.map(r => (
          <li key={r._id}>
            {r.nombre} — {r.tipo}{' '}
            <button onClick={() => api.delete(`/recursos/${r._id}`).then(fetch)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}