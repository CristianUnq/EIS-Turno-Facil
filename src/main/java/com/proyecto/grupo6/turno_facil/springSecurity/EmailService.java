package com.proyecto.grupo6.turno_facil.springSecurity;

import com.proyecto.grupo6.turno_facil.models.Turno;
import com.proyecto.grupo6.turno_facil.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UsuarioRepository usuario;

    public void enviarMailRecordatorio1Dia(Turno turno) {
        enviar("Recordatorio de turno - turnoFacil", turno,
                "Acordate que tenés un turno mañana {0} a las {1}h con {2} en {3}");
    }

    public void enviarMailRecordatorio2Horas(Turno turno) {
        enviar("Recordatorio de turno - turnoFacil", turno,
                "Acordate que en 2 horas tenés un turno hoy {0} a las {1}h con {2} en {3}");
    }

    private void enviar(String asunto, Turno turno, String template) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        String direccionNegocio = usuario.direccionNegocio(turno.getEmailNegocio()).orElse("");

        mensaje.setFrom("turnofacil.notif@gmail.com");
        mensaje.setTo(turno.getEmailUsuario());
        mensaje.setSubject(asunto);
        mensaje.setText(MessageFormat.format(template,
                turno.getFecha(), turno.getHora(), turno.getNombreNegocio(), direccionNegocio));

        mailSender.send(mensaje);
        System.out.println("Mail enviado con éxito");
    }

}


