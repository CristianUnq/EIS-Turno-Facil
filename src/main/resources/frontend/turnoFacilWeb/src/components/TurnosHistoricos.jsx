import React, { useEffect, useState } from 'react';
import styles from '../styles/MisTurnos.module.css';
import Header from './Header';

const TurnosHistoricos = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      try {
        const email = localStorage.getItem("user");
        const response = await fetch(`/api/turnosHistoricos/negocio?email=${email}`);
        
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

  const cancelarTurno = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que querés cancelar este turno?');
    if (confirmacion) {
      setTurnos(turnos.filter((t) => t.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.titulo}>Mis Turnos Reservados</h2>
        {loading ? (
          <p className={styles.cargando}>Cargando turnos...</p>
        ) : turnos.length === 0 ? (
          <p className={styles.noTurnos}>No tenés turnos reservados.</p>
        ) : (
          <ul className={styles.lista}>
            {turnos.map((turno) => (
              <li key={turno.id} className={styles.turno}>
                <div className={styles.info}>
                  <span className={styles.servicio}>{turno.nombreNegocio}</span>
                  <span className={styles.fecha}>
                    {new Date(turno.fecha).toLocaleString('es-AR', {
                      dateStyle: 'long'
                    })}
                    {" " + turno.hora.slice(0,5)}
                  </span>
                </div>
                <button
                  className={styles.botonCancelar}
                  onClick={() => cancelarTurno(turno.id)}
                >
                  Cancelar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TurnosHistoricos;
