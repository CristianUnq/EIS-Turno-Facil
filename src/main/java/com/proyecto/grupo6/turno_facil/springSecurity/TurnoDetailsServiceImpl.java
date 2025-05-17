package com.proyecto.grupo6.turno_facil.springSecurity;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.grupo6.turno_facil.models.Turno;
import com.proyecto.grupo6.turno_facil.repository.TurnoRepository;

@Service
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
        return turnoRepository.findAllByUsuarioEmail(emailUsuario);
    }

    @Override
    public List<Turno> recuperarTurnosNegocio(String emailNegocio) {
        return turnoRepository.findAllByNegocioEmail(emailNegocio);
    }


    @Override
    public Turno eliminarTurno(Turno turno) {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'eliminarTurno'");
    }

    @Override
    public Turno recuperarTurno(Long id) throws NoSuchElementException{
        return turnoRepository.findById(id).get();
    }

}