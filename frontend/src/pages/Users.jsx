import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [editUserId, setEditUserId] = useState(null); // ID del usuario que se está editando
  const [editData, setEditData] = useState({ name: "", email: "", role: "", curso: "" });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "alumno",
    curso: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
      setFiltered(res.data);
    } catch (err) {
      alert("Error al cargar usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let data = [...users];
    if (role) data = data.filter((u) => u.role === role);
    if (search) data = data.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(data);
  }, [search, role, users]);

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      const msg = error?.response?.data?.mensaje || "Error al eliminar usuario";
      alert(msg);
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", newUser);
      fetchUsers();
      setNewUser({ name: "", email: "", password: "", role: "alumno", curso: "" });
      alert("Usuario creado correctamente");
    } catch (error) {
      const msg = error?.response?.data?.mensaje || "Error al crear usuario";
      alert(msg);
    }
  };

  const comenzarEdicion = (u) => {
    setEditUserId(u._id);
    setEditData({ name: u.name, email: u.email, role: u.role, curso: u.curso || "" });
  };

  const cancelarEdicion = () => {
    setEditUserId(null);
    setEditData({ name: "", email: "", role: "", curso: "" });
  };

  const guardarEdicion = async () => {
    try {
      await api.put(`/users/${editUserId}`, editData);
      fetchUsers();
      cancelarEdicion();
      alert("Usuario actualizado");
    } catch (error) {
      const msg = error?.response?.data?.mensaje || "Error al actualizar usuario";
      alert(msg);
    }
  };

  return (
    <div className="container">
      <h2>Usuarios</h2>

      {/* Crear usuario */}
      <form onSubmit={crearUsuario} style={{ marginBottom: "2rem" }}>
        <h4>Crear nuevo usuario</h4>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="profesor">Profesor</option>
          <option value="alumno">Alumno</option>
        </select>
        {newUser.role === "alumno" && (
          <select
            value={newUser.curso}
            onChange={(e) => setNewUser({ ...newUser, curso: e.target.value })}
            required
          >
            <option value="">Seleccione curso</option>
            {["Kinder", "1° Básico", "2° Básico", "3° Básico", "4° Básico", "5° Básico",
              "6° Básico", "7° Básico", "8° Básico", "1° Medio", "2° Medio",
              "3° Medio", "4° Medio"].map((nivel) => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
        )}
        <button type="submit">Crear</button>
      </form>

      {/* Filtros */}
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Todos</option>
        <option value="admin">Admin</option>
        <option value="profesor">Profesor</option>
        <option value="alumno">Alumno</option>
      </select>

      {/* Listado de usuarios */}
      <ul>
        {filtered.map((u) => (
          <li key={u._id}>
            {editUserId === u._id ? (
              <>
                <input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <input
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
                <select
                  value={editData.role}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="profesor">Profesor</option>
                  <option value="alumno">Alumno</option>
                </select>
                {editData.role === "alumno" && (
                  <select
                    value={editData.curso}
                    onChange={(e) => setEditData({ ...editData, curso: e.target.value })}
                  >
                    <option value="">Seleccione curso</option>
                    {["Kinder", "1° Básico", "2° Básico", "3° Básico", "4° Básico", "5° Básico",
                      "6° Básico", "7° Básico", "8° Básico", "1° Medio", "2° Medio",
                      "3° Medio", "4° Medio"].map((nivel) => (
                      <option key={nivel} value={nivel}>{nivel}</option>
                    ))}
                  </select>
                )}
                <button onClick={guardarEdicion}>Guardar</button>
                <button onClick={cancelarEdicion}>Cancelar</button>
              </>
            ) : (
              <>
                {u.name} ({u.role}){" "}
                <button onClick={() => comenzarEdicion(u)}>Editar</button>
                <button onClick={() => eliminar(u._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
