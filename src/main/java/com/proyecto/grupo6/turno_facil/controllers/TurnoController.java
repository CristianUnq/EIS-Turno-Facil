package com.proyecto.grupo6.turno_facil.controllers;

import com.proyecto.grupo6.turno_facil.controllers.dto.TurnoDTO;
import com.proyecto.grupo6.turno_facil.models.Turno;
import com.proyecto.grupo6.turno_facil.repository.TurnoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TurnoController {
    @Autowired
    private final TurnoRepository turnoRepository;

    
    public TurnoController(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    @GetMapping("/turnos")
    public ResponseEntity<?> getTurnosUsuario(@RequestParam String email) {
        
        List<Turno> turnos = turnoRepository.findAllByEmailUsuario(email);
        if(!turnos.isEmpty()){
            return ResponseEntity.ok(turnos);
        }
        return ResponseEntity.badRequest().body("No se encontraron turnos agendados");
    }
}