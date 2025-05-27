import { useNavigate } from 'react-router-dom';
import styles from '../styles/header.module.css';

function Header() {
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem('user'))

  const handleClickOnLogo = () => {
    if (user) {
      if (user.isNegocio) {
        navigate("/turnosNegocio")
      } else {
        navigate("/turno")
      }
    } else {
      navigate("/login")
    }
  }

  const handleCerrarSesion = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <header className={styles.header}>
      <a className={styles.logo} onClick={handleClickOnLogo}>turnoFacil</a>
      {
        user 
        &&
        <span className={styles.cerrarSesion} onClick={handleCerrarSesion}>[Cerrar sesión] </span>
      }
    </header>
  );
}

export default Header;
