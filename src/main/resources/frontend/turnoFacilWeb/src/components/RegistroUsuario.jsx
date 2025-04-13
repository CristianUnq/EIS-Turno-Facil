import React, { useState } from 'react';

const RegistroUsuario = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    contrasenia: '',
    confirmarcontrasenia: ""
   });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formulario.contrasenia !== formulario.confirmarcontrasenia) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const { confirmarcontrasenia, ...restoDelFormulario } = formulario;

    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(restoDelFormulario)
    })
    .then(res => {
      if (res.ok) return res.text();
      throw new Error("Registro fallido");
    })
    .then(msg => alert("✅ " + msg))
    .catch(err => alert("❌ " + err.message));
  };

  return (
    <div >
      <h2 >Registro de Usuario</h2>
      <form onSubmit={handleSubmit} >
        
        <label htmlFor="nombre">Nombres:</label>
        <input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} required />

        <label htmlFor="direccion">Dirección:</label>
        <input type="text" id="direccion" name="direccion" value={formulario.direccion} onChange={handleChange} required />

        <label htmlFor="telefono">Teléfono:</label>
        <input type="tel" id="telefono" name="telefono" value={formulario.telefono} onChange={handleChange} required />

        <label htmlFor="correo">Correo Electrónico:</label>
        <input type="email" id="email" name="email" value={formulario.email} onChange={handleChange} required />

        <label htmlFor="contrasenia">contraseña:</label>
        <input type="password" id="contrasenia" name="contrasenia" value={formulario.contrasenia} onChange={handleChange} required />

        <label htmlFor="confirmarcontrasenia">Confirmar contraseña:</label>
        <input type="password" id="confirmarcontrasenia" name="confirmarcontrasenia" value={formulario.confirmarcontrasenia} onChange={handleChange} required />

        
        

        <button type="submit" >Guardar</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
