import React, { useState } from 'react';
import './styles/FormTurno.css';

function FormTurno() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Turno solicitado:\nNombre: ${nombre}\nEmail: ${email}\nFecha: ${fecha}\nEspecialidad: ${especialidad}`);
  // };
  const handleSubmit =  async (e) => {
    e.preventDefault();
    await fetch("/api/auth/sacarTurno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({nombreNegocio: nombre, fecha: fecha, hora: hora})
    })
    .then(res => {
      if (res.ok) {
        console.log(res);
        return
      };
      throw new Error("Credenciales incorrectas");
    })
    .catch(err => alert("❌ " + err.message));
  };

  return (
    <form onSubmit={handleSubmit} className="form-turno">
      <h2>Formulario de Turno</h2>

      <label>Nombre completo</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Especialidad</label>
      <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required>
        <option value="">Seleccioná una</option>
        <option value="Odontología">Odontología</option>
        <option value="Dermatología">Dermatología</option>
        <option value="Oftalmología">Oftalmología</option>
      </select>

      <label>Fecha</label>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

      <label>Fecha</label>
      <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
      <button type="submit">Solicitar Turno</button>
    </form>
  );
}

export default FormTurno;
