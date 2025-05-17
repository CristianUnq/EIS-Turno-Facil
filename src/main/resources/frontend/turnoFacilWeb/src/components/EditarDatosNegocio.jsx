import React, { useState, useEffect } from 'react';
import Header from './Header';
import styles from '../styles/registroNegocio.module.css';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const horarios = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];



const EditarDatosNegocio = () => {
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
  
  useEffect(() => {
    const fetchDatosNegocio = async () => {
      try {
        const email = JSON.parse(localStorage.getItem("user")).email;
        if (!email) {
          console.error("No se encontró el email en localStorage.");
          return;
        }
  
        const response = await fetch(`/api/negocio/porEmail?email=${email}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }
  
        const data = await response.json();
        const diasAtencion = data.diasDeAtencion ? JSON.parse(data.diasDeAtencion) : {};
        setFormulario(prev => ({
          ...prev,
          nombreNegocio: data.nombreNegocio || '',
          direccion: data.direccion || '',
          telefono: data.telefono || '',
          email: data.email || '',
          duracionTurno: data.duracionTurno || '',
          diaDesde: diasAtencion.diaDesde || 'Lunes',
          diaHasta: diasAtencion.diaHasta || 'Viernes',
          horaDesde: diasAtencion.horaDesde || '08:00',
          horaHasta: diasAtencion.horaHasta || '18:00'
        }));
      } catch (error) {
        console.error("❌ Error al cargar datos del negocio:", error.message);
      }
    };
  
    fetchDatosNegocio();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const datosEditables = {
      direccion: formulario.direccion,
      telefono: formulario.telefono,
      duracionTurno: formulario.duracionTurno,
      diasDeAtencion: JSON.stringify({
        diaDesde: formulario.diaDesde,
        diaHasta: formulario.diaHasta,
        horaDesde: formulario.horaDesde,
        horaHasta: formulario.horaHasta
      })
    };
    
    const email = JSON.parse(localStorage.getItem("user")).email;

    fetch(`/api/negocio/actualizarPorEmail?email=${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosEditables)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al actualizar");
        return res.text();
      })
      .then(msg => {
        alert("✅ Datos actualizados");
        navigate("/turnosNegocio");
       })
      .catch(err => alert("❌ " + err.message));
  };

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
          <h2 className={styles.title}>Editar Datos de Negocio</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.column}>

            <input type="text" placeholder="Nombre del negocio" id="nombreNegocio" name="nombreNegocio" value={formulario.nombreNegocio} disabled />
            <input type="text" id="direccion" placeholder="Dirección" name="direccion" value={formulario.direccion} onChange={handleChange} required />
            <input type="tel" placeholder="Teléfono" id="telefono" name="telefono" value={formulario.telefono} onChange={handleChange} required />
            <input type="email" placeholder="Correo electrónico" id="email" name="email" value={formulario.email} disabled />
            <input type="password" placeholder="Contraseña" id="contrasenia" name="contrasenia" value={formulario.contrasenia} disabled />
            <input type="password" placeholder="Contraseña" id="confirmarContrasenia" name="confirmarContrasenia" value={formulario.confirmarContrasenia} disabled />
    </div>
    <div className={styles.column}>
    <input type="number" placeholder="Duración del turno (minutos)" id="duracionTurno" name="duracionTurno" value={formulario.duracionTurno} onChange={handleChange} required/>


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
              <button type="button" className={styles.button} onClick={handleSubmit}>Guardar</button>
            </div>
            </div>
    </div>
  );
};

export default EditarDatosNegocio;
