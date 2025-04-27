import React from 'react';
import FormTurno from './FormTurno';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


const SeleccionarTurno = () => {
  const navigate = useNavigate();
  const handleClick = ()=> {
    navigate("/misturnosuser")
  }
  return (
    <div>
        <Header />
        <FormTurno />
        <button type="submit" onClick={handleClick}>Mis Turnos</button>
    </div>
  );
};

export default SeleccionarTurno;
