# Proyecto de Título: Biblioteca Escolar CRA - MERN

Este proyecto es parte de la titulación en Ingeniería en Informática. 
---

## 🌐 Tecnologías Utilizadas

- **Frontend**: React + Vite + Axios + React Router DOM
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Control de versiones**: Git + GitHub

---

## 🚀 Instrucciones para ejecutar el proyecto


## 🔧 Backend

### Instalación
```bash
cd backend
yarn install
```

Crea un archivo `.env` dentro de `backend/` con la siguiente configuración:
```env
PORT=5000
MONGO_URI=mongodb://
JWT_SECRET=tu_clave_secreta
```

Inicia el servidor:
```bash
yarn start
```

---

## 💻 Frontend

### Instalación
```bash
cd ../frontend
yarn install
```

Crea un archivo `.env` dentro de `frontend/` con esta variable:
```env
VITE_BASE_URL=http://localhost:5000/api
```

Inicia el cliente:
```bash
yarn dev
```

---

## 🧩 Funcionalidades principales

- Login de usuario
- Visualización y creación de libros con clasificación Dewey
- Gestión de recursos de la biblioteca (En Proceso)
- Listado y eliminación de usuarios
- Gestión de préstamos  (En Proceso)
- Visualización del perfil según el rol

---

## 📄 Estructura del Proyecto

```
biblioteca/
├── backend/        # Servidor Express y rutas API
├── frontend/       # Aplicación cliente en React
├── .gitignore
├── README.md
```

---

## 💡 Notas

- El proyecto fue desarrollado usando `yarn` para mantener consistencia entre frontend y backend.
- Se ignoraron los archivos `.env`, `node_modules`, y `dist` para mantener limpio el repositorio.
- Se recomienda usar MongoDB local para pruebas y Postman para validar rutas del backend.

---

## 👩‍💼 Autor

Daniel Carreño 

Este proyecto es parte del trabajo de título 2025.