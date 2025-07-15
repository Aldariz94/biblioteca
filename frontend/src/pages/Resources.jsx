// src/pages/Resources.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ResourceForm from './ResourceForm';
import { useNavigate } from 'react-router-dom';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verifica si el usuario tiene sesión
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setUser(data);
      } catch {
        navigate('/login'); // redirige si no hay sesión
      }
    };
    fetchUser();
  }, [navigate]);

  // Obtiene los recursos si el usuario está autenticado
  useEffect(() => {
    const fetchResources = async () => {
      if (user) {
        try {
          const { data } = await api.get('/recursos');
          setResources(data);
        } catch {
          alert('Error al cargar recursos');
        }
      }
    };
    fetchResources();
  }, [user]);

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar recurso?')) {
      try {
        await api.delete(`/recursos/${id}`);
        const { data } = await api.get('/recursos');
        setResources(data);
      } catch {
        alert('No se pudo eliminar el recurso');
      }
    }
  };

  if (!user) return null; // no mostrar nada mientras no haya sesión

  return (
    <div className="container">
      <h1>Recursos Internos</h1>
      <ResourceForm onSuccess={async () => {
        const { data } = await api.get('/recursos');
        setResources(data);
      }} />
      <ul>
        {resources.map((r) => (
          <li key={r._id}>
            {r.nombre} — {r.tipo}{' '}
            <button onClick={() => eliminar(r._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
