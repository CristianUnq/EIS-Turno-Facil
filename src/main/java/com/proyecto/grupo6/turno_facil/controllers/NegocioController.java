package com.proyecto.grupo6.turno_facil.controllers;

import com.proyecto.grupo6.turno_facil.models.Usuario;
import com.proyecto.grupo6.turno_facil.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class NegocioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Obtener TODOS los negocios registrados
    @GetMapping("/negocios")
    public ResponseEntity<?> getNegocios() {
        List<Usuario> users = usuarioRepository.findAll();
        if(!users.isEmpty()){
            List<Usuario> negocios = (List<Usuario>) users.stream()
                    .filter(u -> u.isNegocio()).collect(Collectors.toList());
            return ResponseEntity.ok(negocios);
        }
        return ResponseEntity.badRequest().body("No se encontraron negocios registrados");
    }

}
