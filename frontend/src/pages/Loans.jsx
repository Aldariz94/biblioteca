import React, { useEffect, useState } from 'react';
import api from '../api/api';

// Página de préstamos del usuario autenticado
const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data } = await api.get('/loans');
        setLoans(data);
      } catch {
        setError('No se pudo cargar los préstamos');
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="container">
      <h1>Mis Préstamos</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {loans.length === 0 ? (
          <li>No tienes préstamos activos.</li>
        ) : (
          loans.map(loan => (
            <li key={loan._id}>
              <strong>{loan.book.title}</strong> — Estado: {loan.status}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Loans;