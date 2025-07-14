import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/books");
    } catch {
      alert("Credenciales inválidas");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
