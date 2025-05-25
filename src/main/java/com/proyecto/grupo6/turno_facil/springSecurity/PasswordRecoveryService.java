package com.proyecto.grupo6.turno_facil.springSecurity;

public interface PasswordRecoveryService {
    public void sendResetPasswordEmail(String email);
    public void resetPassword(String token,String newPass);
}
