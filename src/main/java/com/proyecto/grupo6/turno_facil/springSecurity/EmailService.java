package com.proyecto.grupo6.turno_facil.springSecurity;

import com.proyecto.grupo6.turno_facil.models.Turno;
import com.proyecto.grupo6.turno_facil.models.Usuario;
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
                "Acordate que tenés un turno mañana {0} a las {1}h con {2} en {3}",
                turno.getUsuario().getEmail());
    }

    public void enviarMailRecordatorio2Horas(Turno turno) {
        enviar("Recordatorio de turno - turnoFacil", turno,
                "Acordate que en 2 horas tenés un turno hoy {0} a las {1}h con {2} en {3}",
                turno.getUsuario().getEmail());
    }

    private void enviar(String asunto, Turno turno, String template, String... destinatarios) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        String direccionNegocio = usuario.direccionNegocio(turno.getNegocio().getEmail()).orElse("");

        mensaje.setFrom("turnofacil.notif@gmail.com");
        mensaje.setTo(destinatarios);
        mensaje.setSubject(asunto);
        mensaje.setText(MessageFormat.format(template,
                turno.getFecha(), turno.getHora(), turno.getNegocio().getNombreNegocio(), direccionNegocio));

        mailSender.send(mensaje);
        System.out.println("Mail enviado con éxito");
    }

    public void enviarMailAlertaCancelado(Turno turno, boolean enviarAUsuario) {
        String destinatario= enviarAUsuario? turno.getUsuario().getEmail():turno.getNegocio().getEmail();
        Usuario usuario = turno.getUsuario();
        String template= enviarAUsuario? "con {2} en {3}":"del usuario "+ usuario.getNombre()+" "+usuario.getApellido()+" con mail "+usuario.getEmail();
  
        enviar("Cancelación de turno - turnoFacil", turno,
                "Se ha cancelado el turno del día {0} a las {1}h "+template,
                destinatario);
    }

    public void enviarMail(String asunto, String msg, String... destinatarios) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
         mensaje.setFrom("turnofacil.notif@gmail.com");
        mensaje.setTo(destinatarios);
        mensaje.setSubject(asunto);
        mensaje.setText(msg);
        mailSender.send(mensaje);
        System.out.println("Mail de recuperación enviado con éxito");
    }
}


