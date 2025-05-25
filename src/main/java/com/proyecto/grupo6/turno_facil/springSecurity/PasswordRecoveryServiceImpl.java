package com.proyecto.grupo6.turno_facil.springSecurity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.proyecto.grupo6.turno_facil.models.Usuario;

@Service
public class PasswordRecoveryServiceImpl implements PasswordRecoveryService{

    @Autowired
    EmailService emailService;
    @Autowired
    UsuarioDetailsServiceImpl usuarioService;

    @Override
    public void sendResetPasswordEmail(String email) throws UsernameNotFoundException{
        UsuarioDetails usuarioDetails = (UsuarioDetails)usuarioService.loadUserByUsername(email);
        Usuario usuario= usuarioDetails.getUsuario();
        String token;
        while (true) {
            token = UUID.randomUUID().toString();
            try {
                usuarioService.recoverUserByRecoveryToken(token);
            } catch (UsernameNotFoundException e) {
                break;
            }
        } //Se hace por que hay una minima probabilidad de que se repita
        usuario.setRecoveryToken(token);
        usuario.setTokenExpireTime(LocalDateTime.now().plusMinutes(30));
        usuarioService.updateUser(usuario);

        String resetLink = "http://localhost:3000/resetPassword?token=" + token;
        emailService.enviarMail("Recuperacion de contraseña - turnoFacil", "Hace click en este link para restaurar tu contraseña: " + resetLink, email);
    }

    @Override
    public void resetPassword(String token, String newPass) throws UsernameNotFoundException{
        UsuarioDetails udetails= (UsuarioDetails)usuarioService.recoverUserByRecoveryToken(token);
        Usuario usuario= udetails.getUsuario();
        if (usuario.getTokenExpireTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        usuario.setContrasenia(newPass);
        usuario.setRecoveryToken(null);
        usuario.setTokenExpireTime(null);
        usuarioService.updateUser(usuario);
    }

}
