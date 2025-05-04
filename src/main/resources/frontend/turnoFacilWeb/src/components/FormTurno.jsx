import React, { useState, useEffect } from 'react';
import DatePicker,{registerLocale} from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/FormTurno.css';
import { useNavigate } from 'react-router-dom';


function FormTurno() {
  const [fechaYHoraCompletaSeleccionada, setFechaYHoraCompletaSeleccionada] = useState(new Date())
  const [fechaSeleccionada, setFechaSeleccionada] = useState()
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [negocioSeleccionado, setNegocioSeleccionado] = useState('');
  const [negocios, setNegocios] = useState(null);
  const [horariosDelNegocio, setHorariosDelNegocio] = useState([])
  const [turnosOcupados, setTurnosOcupados] = useState([]);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  const navigate = useNavigate();
  const handleClick = ()=> {
    navigate("/misturnosuser")
  }
  registerLocale("es",es);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth/sacarTurno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({id:null,emailUsuario: localStorage.getItem('user'), nombreNegocio: negocioSeleccionado, emailNegocio: getNegocio(negocioSeleccionado).email, fecha:fechaSeleccionada, hora:horaSeleccionada})
    })
    .then(async res => {
      if (res.ok) {
        window.location.reload()
        return res.text()
      };
      throw new Error(await res.text())
    })
    .then(msg => {
      alert("✅ " + msg);}
    )
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
  
  const estaEnRangoDeDias = (fecha) => {
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const dateObj = new Date(fecha);
    const diaNombre = diasSemana[(dateObj.getDay() +6) %7];
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
  
    const fecha = new Date(fechaStr); 
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    const diaSemana = dias[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
  
    return `${diaSemana} ${dia} de ${mes} del ${anio}`;
  };

  const updateTurnosOcupados = async () => {
    try {
      const emailNegocio = getNegocio(negocioSeleccionado)?.email;
      if (!emailNegocio) return;
  
      const response = await fetch(`/api/turnosFuturos/negocio?email=${emailNegocio}`);
      if (!response.ok) return;

      const turnosNegocio = await response.json();
      const fechasYHoras = turnosNegocio.map(t => `${t.fecha}T${t.hora}`);
      setTurnosOcupados(fechasYHoras);
    } catch (e) {
      throw new Error("Error al consultar turnos ocupados");
    }
  }
  
  const fechasYHorasOcupadas = turnosOcupados?.map(str => new Date(str));
  
  const estaEnRangoHoras= (date)=>{
    if (!date) return false;

    const now = new Date();
    const selectedDate = new Date(date);

    const negocioActual = getNegocio(negocioSeleccionado);
    if (!negocioActual?.diasDeAtencion) return false;

    const { horaDesde, horaHasta } = JSON.parse(negocioActual.diasDeAtencion);
    const [minHoras, minMinutos] = horaDesde.split(":").map(Number);
    const [maxHoras, maxMinutos] = horaHasta.split(":").map(Number);

    const selectedMinTotal = selectedDate.getHours() * 60 + selectedDate.getMinutes();
    const minTotal = minHoras * 60 + minMinutos;
    const maxTotal = maxHoras * 60 + maxMinutos;

    // Condición 1: dentro del rango del negocio
    const dentroDelRango = selectedMinTotal >= minTotal && selectedMinTotal <= maxTotal;

    // Condición 2: si la fecha es hoy, que sea posterior a la hora actual
    const esHoy = selectedDate.toDateString() === now.toDateString();
    const esFuturo = !esHoy || selectedDate.getTime() > now.getTime();

    // Condición 3: que no esté ocupado
    const ocupado = turnosOcupados.some(str => {
      const t = new Date(str);
      return t.getTime() === selectedDate.getTime();
    });

    return dentroDelRango && esFuturo && !ocupado;

    //return currentDate.getTime() < selectedDate.getTime() && selectedTotalMin >= minTotalMin && selectedTotalMin <= maxTotalMin
  }

  const handleDateChange = (date)=>{
    setFechaYHoraCompletaSeleccionada(date)
    const fyhS=date
    if (fyhS) {
      const soloFecha = new Date(
        fyhS.getFullYear(),
        fyhS.getMonth(),
        fyhS.getDate()
      );
      const soloHora = String(fyhS.getHours()).padStart(2, '0')+":"+String(fyhS.getMinutes()).padStart(2, '0')
      setFechaSeleccionada(fyhS);
      setHoraSeleccionada(soloHora);
    } else {
      setFechaSeleccionada(null);
      setHoraSeleccionada(null);
    }
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

  useEffect(() => {
    updateTurnosOcupados();
  }, [negocioSeleccionado]); // se actualiza si cambia el negocio

  const getTimeInterval= ()=>{
    return getNegocio(negocioSeleccionado).duracionTurno
  }

  return (
    <form onSubmit={handleSubmit} className="form-turno">
      <h2>Reservar turno</h2>

      <label>Negocio o Profesional</label>
      <select defaultValue={"Seleccione un negocio"} value={negocioSeleccionado} onChange={(e) => handleOnChangeNegocioSeleccionado(e.target.value)} required>
      <option value="" disabled hidden>Seleccione negocio o profesional</option>
        {
          negocios?.map(n => {
            return (
              <option key={n.id} value={n.nombreNegocio} >{n.nombreNegocio}</option>
            )
          })
        }
        
      </select>
      {negocioSeleccionado?
      (<div>
      <label>Fecha</label>
      
        <DatePicker minDate={today}
                    maxDate={maxDate}
                    filterDate={estaEnRangoDeDias}
                    filterTime={estaEnRangoHoras}
                    previousMonthButtonLabel={""} 
                    nextMonthButtonLabel={""} 
                    locale="es" 
                    dateFormat={"dd/MM/yyyy h:mm aa"} 
                    selected={fechaYHoraCompletaSeleccionada} 
                    onChange={date=> handleDateChange(date)} 
                    showMonthDropdown 
                    showYearDropdown
                    showTimeSelect
                    timeIntervals={getTimeInterval()}
                    onFocus={(e) => e.target.readOnly = true}/>
      <label>Elige el horario del turno para el {fechaFormateada(fechaYHoraCompletaSeleccionada)} </label>

      {estaEnRangoDeDias(fechaSeleccionada) && estaEnRangoHoras(fechaSeleccionada)
      ?
      (
        <button type="submit">Solicitar Turno</button>
      )
      :
      <p>Seleccione un horario valido</p>
      }
      
      

      </div>):(<div/>)}
      <button type= "button" onClick={handleClick}>Mis Turnos</button>
      </form>
  );
}

export default FormTurno;
