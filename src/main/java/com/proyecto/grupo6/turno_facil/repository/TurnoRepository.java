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

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findAllByEmailUsuario(String emailUsuario);
    List<Turno> findAllByEmailNegocio(String emailNegocio);

    @Query("SELECT t FROM Turno t WHERE t.emailNegocio = :emailNegocio " +
            "AND CAST(t.fecha as string) < CAST(:fecha as string) AND CAST(t.hora as string) < CAST(:hora as string)")
    List<Turno> findTurnosHistoricos(
            @Param("emailNegocio") String emailNegocio,
            @Param("fecha") LocalDate fecha,
            @Param("hora") LocalTime hora
    );

    @Query("SELECT t FROM Turno t WHERE t.emailNegocio = :emailNegocio " +
            "AND CAST(t.fecha as string) >= CAST(:fecha as string) AND CAST(t.hora as string) >= CAST(:hora as string)")
    List<Turno> findTurnosFuturos(
            @Param("emailNegocio") String emailNegocio,
            @Param("fecha") LocalDate fecha,
            @Param("hora") LocalTime hora
    );

}
