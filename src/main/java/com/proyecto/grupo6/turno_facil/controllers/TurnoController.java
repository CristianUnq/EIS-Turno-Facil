package com.proyecto.grupo6.turno_facil.controllers;

import com.proyecto.grupo6.turno_facil.controllers.dto.TurnoDTO;
import com.proyecto.grupo6.turno_facil.models.Turno;
import com.proyecto.grupo6.turno_facil.repository.TurnoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api")
public class TurnoController {
    @Autowired
    private final TurnoRepository turnoRepository;

    
    public TurnoController(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    @GetMapping("/turnosFuturos/usuario")
    public ResponseEntity<?> getTurnosFuturosUsuario(@RequestParam String email) {

        LocalDate fechaActual = LocalDate.now();
        LocalTime horaActual = LocalTime.now();
        List<Turno> turnos = turnoRepository.findTurnosFuturosUsuario(email, fechaActual.toString(), horaActual.toString());
        if(!turnos.isEmpty()){
            return ResponseEntity.ok(turnos);
        }
        return ResponseEntity.badRequest().body("No se encontraron turnos agendados");
    }

    @GetMapping("/turnosHistoricos/usuario")
    public ResponseEntity<?> getTurnosHistoricosUsuario(@RequestParam String email) {

        LocalDate fechaActual = LocalDate.now();
        LocalTime horaActual = LocalTime.now();
        List<Turno> turnos = turnoRepository.findTurnosHistoricosUsuario(email, fechaActual.toString(), horaActual.toString());
        if(!turnos.isEmpty()){
            return ResponseEntity.ok(turnos);
        }
        return ResponseEntity.badRequest().body("No se encontraron turnos agendados");
    }

    @GetMapping("/turnosFuturos/negocio")
    public ResponseEntity<?> getTurnosFuturosNegocio(@RequestParam String email) {

        LocalDate fechaActual = LocalDate.now();
        LocalTime horaActual = LocalTime.now();
        List<Turno> turnosFuturos = turnoRepository.findTurnosFuturosNegocio(email, fechaActual.toString(), horaActual.toString());
        if(!turnosFuturos.isEmpty()){
            return ResponseEntity.ok(turnosFuturos);
        }
        return ResponseEntity.badRequest().body("No hay turnos agendados para el negocio");
    }

    @GetMapping("/turnosHistoricos/negocio")
    public ResponseEntity<?> getTurnosHistoricosNegocio(@RequestParam String email) {

        LocalDate fechaActual = LocalDate.now();
        LocalTime horaActual = LocalTime.now();
        List<Turno> turnosHistoricos = turnoRepository.findTurnosHistoricosNegocio(email, fechaActual.toString(), horaActual.toString());
        if(!turnosHistoricos.isEmpty()){
            return ResponseEntity.ok(turnosHistoricos);
        }
        return ResponseEntity.badRequest().body("No hay turnos agendados para el negocio");
    }
}