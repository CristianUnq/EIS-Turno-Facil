package com.proyecto.grupo6.turno_facil.controllers;

import com.proyecto.grupo6.turno_facil.controllers.dto.UsuarioDTO;
import com.proyecto.grupo6.turno_facil.models.Usuario;
import com.proyecto.grupo6.turno_facil.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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
            List<UsuarioDTO> negocios = (List<UsuarioDTO>) users.stream()
                    .filter(u -> u.isNegocio()).map(u->new UsuarioDTO(u)).collect(Collectors.toList());
            return ResponseEntity.ok(negocios);
        }
        return ResponseEntity.badRequest().body("No se encontraron negocios registrados");
    }

    private Usuario getNegocioAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return usuarioRepository.findByEmail(email).orElse(null);
    }

    @GetMapping("/negocio/porEmail")
    public ResponseEntity<?> getNegocioPorEmail(@RequestParam String email) {
    Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
    if (usuario == null || !usuario.isNegocio()) {
        return ResponseEntity.status(404).body("Negocio no encontrado");
    }
    return ResponseEntity.ok(usuario);
}

    @PutMapping("/negocio/actualizarPorEmail")
    public ResponseEntity<?> actualizarNegocioPorEmail(@RequestParam String email, @RequestBody Usuario datosActualizados) {
    Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
    if (usuario == null || !usuario.isNegocio()) {
        return ResponseEntity.status(404).body("Negocio no encontrado");
    }

    usuario.setDireccion(datosActualizados.getDireccion());
    usuario.setTelefono(datosActualizados.getTelefono());
    usuario.setDiasDeAtencion(datosActualizados.getDiasDeAtencion());
    usuario.setDuracionTurno(datosActualizados.getDuracionTurno());

    usuarioRepository.save(usuario);
    return ResponseEntity.ok("Datos del negocio actualizados correctamente");
    }
    
}
