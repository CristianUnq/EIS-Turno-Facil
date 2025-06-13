import React, { useEffect, useState } from 'react';
import styles from '../styles/MisTurnos.module.css';
import style from '../styles/MisTurnosNegocio.module.css';
import Header from './Header';

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      try {
        const email = usuario['email']
        const response = await fetch(`/api/turnosHistoricos/usuario?email=${email}`);
        
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

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.titulo}>Historial de Turnos</h2>
        {loading ? (
          <p className={styles.cargando}>Cargando turnos...</p>
        ) : turnos.length === 0 ? (
          <p className={styles.noTurnos}>No tenés turnos reservados.</p>
        ) : (
          <ul className={styles.lista}>
            {turnos.map((turno) => (
              <li key={turno.id} className={styles.turno}>
                <div className={styles.info}>
                  <span className={styles.servicio}>{turno.negocio.nombreNegocio}</span>
                  <span className={styles.fecha}>
                    {new Date(turno.fecha + 'T03:00:00').toLocaleString('es-AR', {
                      dateStyle: 'long'
                    })}
                    {" " + turno.hora.slice(0,5)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={style.botonVolverContainer}>
             
      <button onClick={() => window.history.back()}>
            Volver
      </button>
            </div>
    </>
  );
};

export default MisTurnos;
