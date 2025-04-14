import React from 'react';
import styles from '../styles/home.module.css';
import Header from './Header';

function Home() {
  return (
    <div className="home">
      <Header />
      <main className={styles.container}>
        <h2 className={styles.title}>Bienvenidos a turnoFacil</h2>
        <p className={styles.slogan}>Gestioná tus turnos de forma rápida y sencilla.</p>

        <div className={styles.box}>
          <a href="/login" className={styles.button}>Iniciar sesión</a>
          <a href="/registroUsuario" className={styles.button}>Registrarme</a>
          <a href="/registroNegocio" className={styles.btnNeg}>Quiero ofrecer mis turnos</a>
        </div>
      </main>
    </div>
  );
};

export default Home;
