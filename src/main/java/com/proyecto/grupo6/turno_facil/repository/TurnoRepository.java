package com.proyecto.grupo6.turno_facil.repository;

import com.proyecto.grupo6.turno_facil.models.Turno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
        
        Optional<Turno> findById(Long id);
    List<Turno> findAllByUsuarioEmail(String email_usuario);

    List<Turno> findAllByNegocioEmail(String email_negocio);

    @Query(value = "SELECT * FROM Turno t WHERE t.email_usuario = :emailUsuario " +
            "AND (t.fecha < :fecha OR (t.fecha = :fecha AND t.hora < :hora))",
            nativeQuery = true)
    List<Turno> findTurnosHistoricosUsuario(
            @Param("emailUsuario") String emailUsuario,
            @Param("fecha") String fecha,
            @Param("hora") String hora
    );

    @Query(value = "SELECT * FROM Turno t WHERE t.email_usuario = :emailUsuario " +
            "AND (t.fecha > :fecha OR (t.fecha = :fecha AND t.hora >= :hora))",
            nativeQuery = true)
    List<Turno> findTurnosFuturosUsuario(
            @Param("emailUsuario") String emailUsuario,
            @Param("fecha") String fecha,
            @Param("hora") String hora
    );

    @Query(value = "SELECT * FROM Turno t WHERE t.email_negocio = :emailNegocio " +
                    "AND (t.fecha < :fecha OR (t.fecha = :fecha AND t.hora < :hora))",
            nativeQuery = true)
    List<Turno> findTurnosHistoricosNegocio(
            @Param("emailNegocio") String emailNegocio,
            @Param("fecha") String fecha,
            @Param("hora") String hora
    );

    @Query(value = "SELECT * FROM Turno t WHERE t.email_negocio = :emailNegocio " +
                    "AND (t.fecha > :fecha OR (t.fecha = :fecha AND t.hora >= :hora))",
            nativeQuery = true)
    List<Turno> findTurnosFuturosNegocio(
            @Param("emailNegocio") String emailNegocio,
            @Param("fecha") String fecha,
            @Param("hora") String hora
    );

}
