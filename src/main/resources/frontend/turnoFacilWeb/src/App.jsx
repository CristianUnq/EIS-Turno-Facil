
import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import RegistroNegocio from './components/RegistroNegocio';
import SeleccionarTurno from './components/SeleccionarTurno';
import RegistroUsuario from './components/RegistroUsuario'
import MisTurnos from './components/MisTurnos'; 
import TurnosNegocio from './components/TurnosNegocio';
import './styles/global.css'
import TurnosHistoricos from './components/TurnosHistoricos';
import MisTurnosHistoricos from './components/MisTurnosHistoricos';
import EditarDatosNegocio from './components/EditarDatosNegocio';
import RecuperarContrasenia from './components/RecuperarContrasenia';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registroNegocio" element={<RegistroNegocio />} />
        <Route path="/registroUsuario" element={<RegistroUsuario />} />
        <Route path="/turno" element={<SeleccionarTurno />} />
        <Route path="/misturnosuser" element={<MisTurnos />}/>
        <Route path="/turnosNegocio" element={<TurnosNegocio />}/>
        <Route path="/turnosHistoricos" element={<TurnosHistoricos />}/>
        <Route path="/turnosHistoricosUsuario" element={<MisTurnosHistoricos />}/>
        <Route path="/editarDatosNegocio" element={<EditarDatosNegocio />}/>
        <Route path='/recuperarContrasenia' element={<RecuperarContrasenia/>} />
        <Route path='/resetPassword' element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
