package com.proyecto.grupo6.turno_facil.controllers;

import com.proyecto.grupo6.turno_facil.models.Usuario;
import com.proyecto.grupo6.turno_facil.repository.UsuarioRepository;
import com.proyecto.grupo6.turno_facil.springSecurity.UsuarioDetails;
import com.proyecto.grupo6.turno_facil.controllers.dto.TurnoDTO;
import com.proyecto.grupo6.turno_facil.controllers.dto.UsuarioDTO;
import com.proyecto.grupo6.turno_facil.repository.TurnoRepository;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TurnoRepository turnoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registro(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado.");
        }

        usuario.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado con éxito.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> inicioSesion(@RequestBody Map<String, String> loginData, HttpSession session) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("contrasenia");

            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            SecurityContext context= SecurityContextHolder.getContext();
            context.setAuthentication(auth);
            UsuarioDetails usuarioDetails=(UsuarioDetails)context.getAuthentication().getPrincipal();
            Usuario usuario= usuarioDetails.getUsuario();
            UsuarioDTO usuarioDTO= new UsuarioDTO(usuario);

            System.out.println(usuarioDTO);
            return ResponseEntity.ok(usuarioDTO);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

    @PostMapping("/sacarTurno")
    public ResponseEntity<?> sacarTurno(@RequestBody TurnoDTO turnoData, HttpSession session) {
            try {
                turnoRepository.save(turnoData.aModelo());
                return ResponseEntity.ok("Turno solicitado correctamente");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Ha habido un problema");
            }
    }

    
}

