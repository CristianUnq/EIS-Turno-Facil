
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import RegistroNegocio from './components/RegistroNegocio';
import SeleccionarTurno from './components/SeleccionarTurno';
import RegistroUsuario from './components/RegistroUsuario'
import MisTurnos from './components/MisTurnos'; 
import './styles/global.css'

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
      </Routes>
    </Router>
  );
}

export default App;
