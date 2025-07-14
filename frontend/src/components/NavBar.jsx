import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => { localStorage.removeItem('token'); navigate('/login'); };
  return (
    <nav className="navbar">
      <Link to="/books">Libros</Link>
      <Link to="/resources">Recursos</Link>
      <Link to="/users">Usuarios</Link>
      <Link to="/loans">Préstamos</Link>
      <Link to="/profile">Perfil</Link>
      {token && <button onClick={logout}>Salir</button>}
    </nav>
  );
}