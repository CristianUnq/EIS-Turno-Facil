package com.proyecto.grupo6.turno_facil.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PruebaController {

    @GetMapping("/saludo")
    public String saludo() {
        return "Hola desde Spring Boot 👋";
    }
}
