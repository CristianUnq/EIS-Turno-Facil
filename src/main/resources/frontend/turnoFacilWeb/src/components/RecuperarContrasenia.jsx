import React, { useState } from 'react';
import Header from './Header';
import styles from '../styles/login.module.css'; // Asegurate de tener este archivo
import { useNavigate } from 'react-router-dom';

function RecuperarContrasenia() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    await fetch("/api/password/request-reset", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:new URLSearchParams({email: email})
    })
    .then( async res => {
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || `Error ${res.status}`);
        };
        const successMessage = await res.text();
        alert("✅ " + successMessage)
    })
    .catch(err => alert("❌ " + err.message));
  };


return (


      <div >
      <div>
      <Header />
      </div>
        <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.title}>Recuperar Contraseña</h2>
          <form onSubmit={handleSubmit} className={styles.form} method="POST" action="javascript:void(0)">
            <input
              type="email"
              name='email'
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autocomplete="on"
              autocompletetype="email"
            />
            <button type="submit" className={styles.button}>Confirmar</button>
            <span>Le enviaremos un email con un link para validar su identidad</span>
          </form>
        </div>
        </div>
      </div>
    );
  }

  export default RecuperarContrasenia;