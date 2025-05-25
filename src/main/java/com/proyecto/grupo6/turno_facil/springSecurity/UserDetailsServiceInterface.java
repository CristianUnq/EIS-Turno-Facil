package com.proyecto.grupo6.turno_facil.springSecurity;

import org.springframework.security.core.userdetails.UserDetails;

import com.proyecto.grupo6.turno_facil.models.Usuario;

public interface UserDetailsServiceInterface {
    public UserDetails recoverUserByRecoveryToken(String token);
    public void updateUser(Usuario usuario);
}
