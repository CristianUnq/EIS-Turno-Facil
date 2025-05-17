import React, { useState } from 'react';
import styles from "../styles/registroUsuario.module.css";
import { Info } from 'lucide-react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const RegistroUsuario = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido:'',
    dni:'',
    telefono: '',
    email: '',
    contrasenia: '',
    confirmarcontrasenia: '',
    isNegocio: false
   });
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formulario.contrasenia !== formulario.confirmarcontrasenia) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const { confirmarcontrasenia, ...restoDelFormulario } = formulario;

    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(restoDelFormulario)
    })
    .then(res => {
      if (res.ok) return res.text();
      throw new Error("Registro fallido");
    })
    .then(msg => { 
      alert("✅ " + msg)
      navigate("/login");
    })
    .catch(err => alert("❌ " + err.message));
  };

  return (
    <div>
          <Header/>

      <div className={styles.formContainer}>
            <div className={styles.avatar}> <img src="/avatar.svg" alt="Avatar" className={styles.avatar} />
            </div>
            <h2 className={styles.title}>Registro de usuario</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                    <input type="text" placeholder="Nombres" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} required />
                    <input type="text" placeholder="Apellidos" id="apellido" name="apellido" value={formulario.apellido} onChange={handleChange} required />
                </div>
                <div className={styles.row}>
                    <input type="text" pattern="[0-9]{7,8}" title="Ingresá un número de DNI válido" placeholder="Número de DNI" id="dni" name="dni" value={formulario.dni} onChange={handleChange} required />
                    <input type="tel" pattern="[0-9]{8,10}" title="Ingresá un número de teléfono válido" placeholder="Teléfono de contacto" id="telefono" name="telefono" value={formulario.telefono} onChange={handleChange} required />
                </div>

                <div className={styles.row}>
                     <input type="email" placeholder="Correo electrónico" id="email" name="email" value={formulario.email} onChange={handleChange} required />
                </div>

                <div className={styles.passwordWrapper}>
                     <input type="password" placeholder="Contraseña" id="contrasenia" name="contrasenia" value={formulario.contrasenia} onChange={handleChange} required />
                    <div className={styles.tooltipContainer}>
                        <Info className={styles.infoIcon} />
                            <div className={styles.tooltipText}>
                                La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.
                            </div>
                    </div>
                </div>
                <input type="password" placeholder="Contraseña" id="confirmarcontrasenia" name="confirmarcontrasenia" value={formulario.confirmarcontrasenia} onChange={handleChange} required />
                <button type="submit" className={styles.button}>Guardar</button>
            </form>
        </div>
        </div>
  );
};

export default RegistroUsuario;
