import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'; 

function Home() {
  return (
    <div className="home">
      <h1>Bienvenido a turnoFacil</h1>
      <p className="slogan">la manera más fácil de gesionar tus turnos</p>
      <div><Link to="/login">Iniciar sesión</Link></div>
      <div className=''><Link to="/registrousuario">Registrarme</Link></div>
      <div><Link to="/registronegocio">Quiero ofrecer turnos</Link></div>
    </div>
  );
}

export default Home;
