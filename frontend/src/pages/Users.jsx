import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    api.get('/users')
      .then(res => {
        setUsers(res.data);
        setFiltered(res.data);
      })
      .catch(err => alert('Error al cargar usuarios'));
  }, []);

  useEffect(() => {
    let data = [...users];
    if (role) data = data.filter(u => u.role === role);
    if (search) data = data.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(data);
  }, [search, role, users]);

  const eliminar = async id => {
    if (!confirm('¿Eliminar este usuario?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (error) {
      const msg = error?.response?.data?.mensaje || 'Error al eliminar usuario';
      alert(msg);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Usuarios</h2>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="">Todos</option>
        <option value="admin">Admin</option>
        <option value="profesor">Profesor</option>
        <option value="alumno">Alumno</option>
      </select>
      <ul>
        {filtered.map(u => (
          <li key={u._id}>
            {u.name} ({u.role}) <button onClick={() => eliminar(u._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}