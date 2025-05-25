package com.proyecto.grupo6.turno_facil.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.grupo6.turno_facil.springSecurity.PasswordRecoveryServiceImpl;
import com.proyecto.grupo6.turno_facil.springSecurity.UsuarioDetailsServiceImpl;


@RequestMapping("/api/password")
@RestController
public class PasswordRecoveryController {
    @Autowired
    PasswordRecoveryServiceImpl recoveryService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    UsuarioDetailsServiceImpl usuarioService;

    @PostMapping("/request-reset")
    public ResponseEntity<?> requestReset(@RequestParam String email){
        try{
            usuarioService.loadUserByUsername(email);
            Thread one = new Thread() {
            public void run() {
                try {
                    recoveryService.sendResetPasswordEmail(email);
                } catch(Exception v) {
                    System.out.println(v);
                }
                }  
            };
            one.start();
        }catch(UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El usuario no existe.");
        }
        return ResponseEntity.ok("Email de restauración se envió correctamente");
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            String hashedPass= passwordEncoder.encode(newPassword);
            recoveryService.resetPassword(token, hashedPass);
            return ResponseEntity.ok("Contraseña actualizada exitosamente");
        
        } catch (UsernameNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("El enlace de recuperación no es válido o el usuario no existe");

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("El enlace de recuperación ha expirado. Por favor, solicita uno nuevo");

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error inesperado. Intenta nuevamente más tarde");
        }
    }
}
