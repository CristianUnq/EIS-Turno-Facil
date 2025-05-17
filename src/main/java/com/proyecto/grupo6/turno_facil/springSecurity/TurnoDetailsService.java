package com.proyecto.grupo6.turno_facil.springSecurity;

import java.util.List;

import com.proyecto.grupo6.turno_facil.models.Turno;

public interface TurnoDetailsService {
    public Turno crearTurno(Turno turno);
    public Turno actualizarTurno(Turno turno);
    public Turno recuperarTurno(Long id);
    public List<Turno> recuperarTurnosUsuario(String emailUsuario);
    public List<Turno> recuperarTurnosNegocio(String emailNegocio);
    public Turno eliminarTurno(Turno turno);
}
