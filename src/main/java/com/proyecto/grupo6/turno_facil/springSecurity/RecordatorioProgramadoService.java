package com.proyecto.grupo6.turno_facil.springSecurity;

import com.proyecto.grupo6.turno_facil.models.Turno;
import com.proyecto.grupo6.turno_facil.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RecordatorioProgramadoService {

    @Autowired
    private TurnoRepository turnoRepository;

    @Autowired
    private EmailService emailService;

    @Scheduled(fixedRate = 1200000) // cada 20 minutos se ejecuta la función
    public void enviarRecordatorios() {
        List<Turno> turnos = turnoRepository.findAll();

        for (Turno t : turnos) {
            LocalDateTime fechaHoraTurno = LocalDateTime.of(t.getFecha(), t.getHora());
            LocalDateTime ahora = LocalDateTime.now();

            long horasDiferencia = ChronoUnit.HOURS.between(ahora, fechaHoraTurno);
            long diasDiferencia = ChronoUnit.DAYS.between(ahora.toLocalDate(), fechaHoraTurno.toLocalDate());

            // Revisión de envío recordatorio 1 día antes
            if (diasDiferencia == 1 && !t.isRecordatorioEnviado1Dia()) {
                emailService.enviarMailRecordatorio1Dia(t);
                t.setRecordatorioEnviado1Dia(true);
                turnoRepository.save(t);
            }

            // Chequeo de envío recordatorio 2 horas antes
            if (diasDiferencia == 0 && horasDiferencia <= 2 && horasDiferencia >= 1 && !t.isRecordatorioEnviado2Horas()) {
                emailService.enviarMailRecordatorio2Horas(t);
                t.setRecordatorioEnviado2Horas(true);
                turnoRepository.save(t);
            }
        }
    }

}
