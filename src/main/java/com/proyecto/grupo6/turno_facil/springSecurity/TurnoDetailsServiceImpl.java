package com.proyecto.grupo6.turno_facil.springSecurity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.proyecto.grupo6.turno_facil.models.Turno;
import com.proyecto.grupo6.turno_facil.repository.TurnoRepository;

public class TurnoDetailsServiceImpl implements TurnoDetailsService{

    @Autowired
    private TurnoRepository turnoRepository;

    @Override
    public Turno crearTurno(Turno turno) {
        turnoRepository.save(turno);
        return(turno);
    }

    @Override
    public Turno actualizarTurno(Turno turno) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'actualizarTurno'");
    }

    @Override
    public List<Turno> recuperarTurnosUsuario(String emailUsuario) {
        return turnoRepository.findAllByEmailUsuario(emailUsuario);
    }

    @Override
    public List<Turno> recuperarTurnosNegocio(String emailNegocio) {
        return turnoRepository.findAllByEmailNegocio(emailNegocio);
    }


    @Override
    public Turno eliminarTurno(Turno turno) {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'eliminarTurno'");
    }

}