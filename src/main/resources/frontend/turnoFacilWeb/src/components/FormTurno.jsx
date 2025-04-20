import React, { useState, useEffect } from 'react';
import '../styles/FormTurno.css';

function FormTurno() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('')
  const [negocioSeleccionado, setNegocioSeleccionado] = useState('');
  const [negocios, setNegocios] = useState(null);
  const [horariosDelNegocio, setHorariosDelNegocio] = useState([])

  const handleSubmit =  async (e) => {
    await fetch("/api/auth/sacarTurno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({usuario: localStorage.getItem('usuario'), negocio: negocioSeleccionado, fecha:fechaSeleccionada, horaTurno:horaSeleccionada})
    })
    .then(res => {
      if (res.ok) {
        alert("✅ " + "lito");
        return
      };
      // throw new Error("Credenciales incorrectas");
    })
    //.then(msg => alert("✅ " + msg))
    .catch(err => alert("❌ " + err.message));
      //alert(`Turno solicitado:\nNombre: ${nombre}\nEmail: ${email}\nFecha: ${fecha}\nEspecialidad: ${especialidad}`);
  };

  const generateHorariosDisponibles = (horaDesde, horaHasta, intervaloMinutos = 60) => {
    const horarios = [];
  
    const [desdeHoras, desdeMinutos] = horaDesde.split(":").map(Number);
    const [hastaHoras, hastaMinutos] = horaHasta.split(":").map(Number);
    const inicio = new Date();
    inicio.setHours(desdeHoras, desdeMinutos, 0, 0);
  
    const fin = new Date();
    fin.setHours(hastaHoras, hastaMinutos, 0, 0);
  
    const actual = new Date(inicio);
  
    while (actual <= fin) {
      const horas = actual.getHours().toString().padStart(2, "0");
      const minutos = actual.getMinutes().toString().padStart(2, "0");
      horarios.push(`${horas}:${minutos}`);
  
      actual.setMinutes(actual.getMinutes() + intervaloMinutos);

      if (actual > fin) break;
    }
  
    return horarios;
  }
  
  const getNegocio = (negocioNombre) => {
    return negocios.find(n => n.nombreNegocio == negocioNombre)
  }

  const handleOnChangeNegocioSeleccionado = (negocioNombre) => {
    setNegocioSeleccionado(negocioNombre);
    let negocioActual = getNegocio(negocioNombre);
    let {horaDesde, horaHasta} = JSON.parse(negocioActual.diasDeAtencion);
    setHorariosDelNegocio(generateHorariosDisponibles(horaDesde, horaHasta, negocioActual.duracionTurno))
  } 

  useEffect(() => {
    fetch("api/negocios", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
    })
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener datos de negocios")
      return res.json()
    })
    .then(res => {
      setNegocios(res)
    })
    .catch(err => alert("❌ " + err.message));
  }, [])

  return (
    <form onSubmit={handleSubmit} className="form-turno">
      <h2>Reservar turno</h2>

      <label>Negocio o Profesional</label>
      <select onChange={(e) => handleOnChangeNegocioSeleccionado(e.target.value)} required>
        <option value=""/>
        {
          negocios?.map(n => {
            return (
              <option key={n.id} value={n.nombreNegocio} >{n.nombreNegocio}</option>
            )
          })
        }
        
      </select>

      <label>Fecha</label>
      <input type="date" value={fechaSeleccionada} onChange={(e) => setFechaSeleccionada(e.target.value)} required />

      <label>Elige el horario del turno para el xx dd de mm</label>

      <ul className="horarios-list">
        {
          horariosDelNegocio.map((h, index) => {
            return(
              <li key={index}>
                <div className="horarios-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={index}
                      name="hora"
                      value={h}
                      defaultChecked={false}
                      disabled={true}
                      onChange={setHoraSeleccionada(h)}
                    />
                  </div>
                  <div className="right-section">{h}</div>
                </div>
            </li>
            );
          })
        }  
      </ul>
      <button type="submit">Solicitar Turno</button>
    </form>
  );
}

export default FormTurno;
