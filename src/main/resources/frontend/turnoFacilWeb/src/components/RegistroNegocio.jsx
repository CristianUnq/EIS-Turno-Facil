import React, { useState } from 'react';


const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const horarios = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];

const RegistroNegocio = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    duracionTurno: '',
    diaDesde: 'Lunes',
    diaHasta: 'Viernes',
    horaDesde: '08:00',
    horaHasta: '18:00'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formulario.contraseña !== formulario.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Datos del negocio:", formulario);
  };

  return (
    <div >
      <h2 >Registro de Negocio</h2>
      <form onSubmit={handleSubmit} >
        
        <label htmlFor="nombre">Nombre del Negocio:</label>
        <input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} required />

        <label htmlFor="direccion">Dirección:</label>
        <input type="text" id="direccion" name="direccion" value={formulario.direccion} onChange={handleChange} required />

        <label htmlFor="telefono">Teléfono:</label>
        <input type="tel" id="telefono" name="telefono" value={formulario.telefono} onChange={handleChange} required />

        <label htmlFor="correo">Correo Electrónico:</label>
        <input type="email" id="correo" name="correo" value={formulario.correo} onChange={handleChange} required />

        <label htmlFor="contraseña">Contraseña:</label>
        <input type="password" id="contraseña" name="contraseña" value={formulario.contraseña} onChange={handleChange} required />

        <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
        <input type="password" id="confirmarContraseña" name="confirmarContraseña" value={formulario.confirmarContraseña} onChange={handleChange} required />

        <label htmlFor="duracionTurno">Duración de cada turno (en minutos):</label>
        <input type="number" id="duracionTurno" name="duracionTurno" value={formulario.duracionTurno} onChange={handleChange} required />

        <label htmlFor="diaDesde">Días de Atención:</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select id="diaDesde" name="diaDesde" value={formulario.diaDesde} onChange={handleChange}>
            {diasSemana.map(dia => <option key={dia}>{dia}</option>)}
          </select>
          <span>hasta</span>
          <select id="diaHasta" name="diaHasta" value={formulario.diaHasta} onChange={handleChange}>
            {diasSemana.map(dia => <option key={dia}>{dia}</option>)}
          </select>
        </div>

        <label htmlFor="horaDesde">Horario de Atención:</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select id="horaDesde" name="horaDesde" value={formulario.horaDesde} onChange={handleChange}>
            {horarios.map(hora => <option key={hora}>{hora}</option>)}
          </select>
          <span>hasta</span>
          <select id="horaHasta" name="horaHasta" value={formulario.horaHasta} onChange={handleChange}>
            {horarios.map(hora => <option key={hora}>{hora}</option>)}
          </select>
        </div>

        <div >
          <h3>Previsualización</h3>
          
          <p><strong>Días:</strong> {formulario.diaDesde} a {formulario.diaHasta}</p>
          <p><strong>Horario:</strong> {formulario.horaDesde} a {formulario.horaHasta}</p>
        </div>

        <button type="submit" >Guardar</button>
      </form>
    </div>
  );
};

export default RegistroNegocio;
