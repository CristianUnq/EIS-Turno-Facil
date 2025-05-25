import React, { useState } from 'react';
import Header from './Header';
import styles from '../styles/login.module.css'; // Asegurate de tener este archivo
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('token');

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    await fetch("/api/password/reset", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:new URLSearchParams({token: token,newPassword: newPassword})
    })
    .then( async res => {
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || `Error ${res.status}`);
        };
        const successMessage = await res.text();
        alert("✅ " + successMessage);
        navigate("/login");
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
          <h2 className={styles.title}>Nueva Contraseña</h2>
          <form onSubmit={handleSubmit} className={styles.form} method="POST" action="javascript:void(0)">
            <input
              type="password"
              name='password'
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name='password'
              placeholder="Confirmar contraseña"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>Aceptar</button>
          </form>
        </div>
        </div>
      </div>
    );
  }

  export default ResetPassword;