package com.proyecto.grupo6.turno_facil.repository;

import com.proyecto.grupo6.turno_facil.models.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    Optional<Turno> findByEmailUsuario(String emailUsuario);
    Optional<Turno> findByEmailNegocio(String emailNegocio);
}
