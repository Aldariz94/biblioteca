import React, { useEffect, useState } from 'react';
import api from '../api/api';

// Página de perfil del usuario
const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setUser(data);
      } catch {
        setError('No se pudo cargar el perfil');
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="container">
      <h1>Mi Perfil</h1>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      {user.curso && <p><strong>Curso:</strong> {user.curso}</p>}
    </div>
  );
};

export default Profile;