import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/MisTurnosNegocio.module.css';
import Header from './Header';

const MisTurnosNegocio = () => {
  const [turnos, setTurnos] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      try {
        const email = localStorage.getItem("user");
        const response = await fetch(`/api/turnosFuturos/negocio?email=${email}`);
        
        if (!response.ok) {
          throw new Error("Error al obtener los turnos");
        }
  
        const data = await response.json();
        setTurnos(data);
        console.log(data);
      } catch (error) {
        console.error("Error al traer los turnos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTurnos();
  }, []);

  const removerTurno = async (id) => {
    try {
      const response = await fetch(`/api/delete?id=${id}`, {
        method: "DELETE"
      });
  
      if (!response.ok) {
        throw new Error("Error al cancelar el turno");
      }
  
      console.log("Turno cancelado correctamente");
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
    }
  };
  
  const formatearFecha = (fecha) =>
    fecha.toISOString().split('T')[0]; // yyyy-mm-dd

  const turnosFiltrados = turnos.filter(
    (t) => t.fecha === formatearFecha(fechaSeleccionada)
  );
  const cancelarTurno = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que querés cancelar este turno?');
    if (confirmacion) {
      removerTurno(id);
      setTurnos(turnos.filter((t) => t.id !== id));
    }
    
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.titulo}>Mis turnos</h2>

        {loading ? (
          <p className={styles.cargando}>Cargando turnos...</p>
        ) : (
          <div className={styles.cardTurnos}>
            <div className={styles.cardContenido}>
              <div className={styles.calendario}>
                <DatePicker
                  minDate={new Date()}
                  selected={fechaSeleccionada}
                  onChange={(date) => setFechaSeleccionada(date)}
                  dateFormat="dd/MM/yyyy"
                  inline
                />
              </div>

              <div className={styles.turnosDelDia}>
                <h3 className={styles.subtitulo}>
                  {fechaSeleccionada.toLocaleDateString('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </h3>

                {turnosFiltrados.length === 0 ? (
                  <p>No hay turnos agendados para este día.</p>
                ) : (
                  <ul className={styles.lista}>
                    {turnosFiltrados.map((turno) => (
                      <li key={turno.id} className={styles.turno}>
                        <div className={styles.info}>
                          <span className={styles.hora}>{turno.hora}</span>
                          <span className={styles.nombre}>{turno.emailUsuario}</span>
                          
                        </div>
                        <a className={styles.botonCancelar}
                      onClick={() => cancelarTurno(turno.id)}
                > Cancelar
                </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.botonVolverContainer}>
              <a href="/turnosHistoricos" className={styles.botonVolver}>Ver historial de turnos</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MisTurnosNegocio;
