package com.proyecto.grupo6.turno_facil.repository;

import com.proyecto.grupo6.turno_facil.models.Turno;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findAllByEmailUsuario(String emailUsuario);
    List<Turno> findAllByEmailNegocio(String emailNegocio);
}
