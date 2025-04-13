import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [contrasenia, setcontrasenia] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({email: email, contrasenia: contrasenia})
    })
    .then(res => {
      if (res.ok) { 
        navigate('/turno');
        return; 
      };
      throw new Error("Credenciales incorrectas");
    })
    //.then(msg => alert("✅ " + msg))
    .catch(err => alert("❌ " + err.message));
  };

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña</label>
        <input
          type="contrasenia"
          value={contrasenia}
          onChange={(e) => setcontrasenia(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
