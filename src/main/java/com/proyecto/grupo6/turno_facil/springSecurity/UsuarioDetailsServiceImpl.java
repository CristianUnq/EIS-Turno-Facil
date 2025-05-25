package com.proyecto.grupo6.turno_facil.springSecurity;

import com.proyecto.grupo6.turno_facil.models.Usuario;
import com.proyecto.grupo6.turno_facil.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService,UserDetailsServiceInterface {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return new UsuarioDetails(usuario);
    }

    @Override
    public UserDetails recoverUserByRecoveryToken(String token) throws UsernameNotFoundException{
        Usuario usuario= usuarioRepository.findByrecoveryToken(token)
                            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        return new UsuarioDetails(usuario);
    }

    @Override
    public void updateUser(Usuario usuario) {
        usuarioRepository.save(usuario);
    }


}
