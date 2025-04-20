import React, { useState, useEffect } from 'react';
import '../styles/FormTurno.css';

function FormTurno() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0])
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
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
    return negocios?.find(n => n.nombreNegocio == negocioNombre)
  }

  const handleOnChangeNegocioSeleccionado = (negocioNombre) => {
    setNegocioSeleccionado(negocioNombre);
    let negocioActual = getNegocio(negocioNombre);
    let {horaDesde, horaHasta} = JSON.parse(negocioActual.diasDeAtencion);
    setHorariosDelNegocio(generateHorariosDisponibles(horaDesde, horaHasta, negocioActual.duracionTurno))
  } 
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const estaEnRangoDeDias = (fecha) => {
    const dateObj = new Date(fecha);
    const diaNombre = diasSemana[dateObj.getDay()];
    let negocioActual = getNegocio(negocioSeleccionado);
    let {diaDesde, diaHasta} = negocioActual?.diasDeAtencion 
                              ? JSON.parse(negocioActual.diasDeAtencion) 
                              : JSON.parse("{\"diaDesde\":\"Lunes\",\"diaHasta\":\"Sábado\",\"horaDesde\":\"09:00\",\"horaHasta\":\"20:00\"}")

    const indiceDesde = diasSemana.indexOf(diaDesde);
    const indiceHasta = diasSemana.indexOf(diaHasta);
    const indiceActual = diasSemana.indexOf(diaNombre);

    if (indiceDesde === -1 || indiceHasta === -1) {
      console.error("Día inválido en diasDeAtencion");
      return false;
    }

    if (indiceDesde <= indiceHasta) {
      return indiceActual >= indiceDesde && indiceActual <= indiceHasta;
    } else {
      // Para casos como de "Viernes" a "Martes"
      return indiceActual >= indiceDesde || indiceActual <= indiceHasta;
    }
  }

  const fechaFormateada = (fechaStr) => {
    if (!fechaStr) return "";
  
    const fecha = new Date(fechaStr + "T00:00:00"); 
    //const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
  
    return `${diaSemana} ${dia} de ${mes} del ${anio}`;
  };
  

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
      <select value={negocioSeleccionado} onChange={(e) => handleOnChangeNegocioSeleccionado(e.target.value)} required>
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

      <label>Elige el horario del turno para el {fechaFormateada(fechaSeleccionada)} </label>

      {estaEnRangoDeDias(fecha)
      ?
      (
        <ul className="horarios-list">
        {
          horariosDelNegocio.map((h, index) => {
            return(
              <li key={index}>
                <div className="horarios-list-item">
                  <div className="left-section">
                    <input
                      type="radio"
                      id={index}
                      name="hora"
                      value={h}
                      checked={horaSeleccionada === h}
                      onChange={(e) => setHoraSeleccionada(e.target.value)}
                      disabled={false}
                    />
                  </div>
                  <div className="right-section">{h}</div>
                </div>
            </li>
            );
          })
        }  
      </ul>
      )
      :
      <p>No hay horarios disponibles para la fecha seleccionada</p>
      }
      
      <button type="submit">Solicitar Turno</button>
    </form>
  );
}

export default FormTurno;
