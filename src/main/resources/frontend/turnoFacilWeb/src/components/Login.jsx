import React, { useState } from 'react';
import Header from './Header';
import styles from '../styles/login.module.css'; // Asegurate de tener este archivo
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [contrasenia, setcontrasenia] = useState('');
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({email: email, contrasenia: contrasenia})
    })
    .then( async res => {
      if (res.ok) {
        var user= await res.json().then(object=>object);
        console.log(user);
        
        localStorage.setItem('user', user.username);
        if (user.isNegocio) {
          navigate('/turnosNegocio');
        } else {
          navigate('/turno');
        }
        return
      };
      throw new Error("Credenciales incorrectas");
    })
    //.then(msg => alert("✅ " + msg))
    .catch(err => alert("❌ " + err.message));
  };


return (


      <div >
      <div>
      <Header />
      </div>
        <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <img src="/avatar.svg" alt="Avatar" className={styles.avatar} />
          <h2 className={styles.title}>Inicio de sesión</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="nombre de usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="contrasenia"
              placeholder="contraseña"
              value={contrasenia}
              onChange={(e) => setcontrasenia(e.target.value)}
              required
            />
            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Recordarme</label>
            </div>
            <button type="submit" className={styles.button}>Iniciar sesión</button>
            <button type="submit" className={styles.button}>Registrarme</button>
          </form>
          <div className={styles.links}>
            <a href="/registroUsuario">Registrarme</a>
            <a href="/registroNegocio">Quiero ofrecer turnos</a>
          </div>
        </div>
        </div>
      </div>
    );
  }

  export default Login;