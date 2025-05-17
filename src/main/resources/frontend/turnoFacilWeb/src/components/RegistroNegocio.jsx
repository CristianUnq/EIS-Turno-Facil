import React, { useState } from 'react';
import Header from './Header';
import styles from '../styles/registroNegocio.module.css';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const horarios = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];

const RegistroNegocio = () => {
  const [formulario, setFormulario] = useState({
    nombreNegocio: '',
    direccion: '',
    telefono: '',
    email: '',
    contrasenia: '',
    confirmarContrasenia: '',
    duracionTurno: '',
    diaDesde: 'Lunes',
    diaHasta: 'Viernes',
    horaDesde: '08:00',
    horaHasta: '18:00',
    isNegocio: true
  });
  const [horariosGuardados, setHorariosGuardados] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const prepararParaEnvio = (formulario) => {
    const {diaDesde, diaHasta, horaDesde, horaHasta, confirmarContrasenia, ...restoDelFormulario } = formulario;
    const diasAtencion =  {diaDesde, diaHasta, horaDesde, horaHasta};
    const diasDeAtencion = JSON.stringify(diasAtencion);
    const datosParaEnviar = {
      ...restoDelFormulario,
      diasDeAtencion,
    };
    
    return datosParaEnviar;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formulario.contrasenia !== formulario.confirmarContrasenia) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const datos = prepararParaEnvio(formulario);
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(datos)
    })
    .then(res => {
      if (res.ok) return res.text();
      throw new Error("Registro fallido");
    })
    .then(msg => {
      alert("✅ " + msg);
      navigate("/login");
    })
    .catch(err => alert("❌ " + err.message));
  }

  const handleGuardar = () => {
      const dias = `${formulario.diaDesde} a ${formulario.diaHasta}`;
      const horas = `${formulario.horaDesde} a ${formulario.horaHasta}`;
      setHorariosGuardados({ días: dias, horas: horas });
    };

  return (
    <div className={styles.container}>
          <Header />
          <div className={styles.formBox}>
          <div className={styles.avatar}> <img src="/avatar.svg" alt="Avatar" className={styles.avatar} /></div>
          <h2 className={styles.title}>Registro de Negocio</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.column}>

        <input type="text" placeholder="Nombre del negocio" id="nombreNegocio" name="nombreNegocio" value={formulario.nombreNegocio} onChange={handleChange} required />
        <input type="text" id="direccion" placeholder="Dirección" name="direccion" value={formulario.direccion} onChange={handleChange} required />
        <input type="tel" pattern="[0-9]{8,10}" title="Ingresá un número de teléfono válido" placeholder="Teléfono" id="telefono" name="telefono" value={formulario.telefono} onChange={handleChange} required />
        <input type="email" placeholder="Correo electrónico" id="email" name="email" value={formulario.email} onChange={handleChange} required />
        <input type="password" placeholder="Contraseña" id="contrasenia" name="contrasenia" value={formulario.contrasenia} onChange={handleChange} required />
        <input type="password" placeholder="Contraseña" id="confirmarContrasenia" name="confirmarContrasenia" value={formulario.confirmarContrasenia} onChange={handleChange} required />
    </div>
    <div className={styles.column}>
            <input type="number" placeholder="Duración del turno (minutos)" id="duracionTurno" name="duracionTurno" value={formulario.duracionTurno} onChange={handleChange} required />

       <div className={styles.selectGroup}>
                     <label>Día desde:</label>

          <select id="diaDesde" name="diaDesde" value={formulario.diaDesde} onChange={handleChange}>
            {diasSemana.map((dia, index) => <option key={dia}>{dia}</option>)}
          </select>
        </div>
        <div className={styles.selectGroup}>
           <label>Día hasta:</label>
          <select id="diaHasta" name="diaHasta" value={formulario.diaHasta} onChange={handleChange}>
            {diasSemana.map((dia, index) => <option key={dia}>{dia}</option>)}
          </select>
        </div>


        <div className={styles.selectGroup}>
              <label>Hora desde:</label>
          <select id="horaDesde" name="horaDesde" value={formulario.horaDesde} onChange={handleChange}>
            {horarios.map((hora, index) => <option key={hora}>{hora}</option>)}
          </select>
        </div>
        <div className={styles.selectGroup}>
                        <label>Hora hasta:</label>
          <select id="horaHasta" name="horaHasta" value={formulario.horaHasta} onChange={handleChange}>
            {horarios.map((hora, index) => <option key={hora}>{hora}</option>)}
          </select>
            <div className={styles.tooltipContainer}>
                      <Info className={styles.infoIcon} />
                      <div className={styles.tooltipText}>
                      </div>
            </div> 
        </div>

        <div >
          <h3>Previsualización</h3>
          
          <p><strong>Días:</strong> {formulario.diaDesde} a {formulario.diaHasta}</p>
          <p><strong>Horario:</strong> {formulario.horaDesde} a {formulario.horaHasta}</p>
        </div>
      </div>
      </form>
      <div className={styles.centeredButtonBox}>
                <button type="submit"className={styles.button}>Registrarme</button>
      </div>
      </div>
    </div>
    
  );
};

export default RegistroNegocio;
