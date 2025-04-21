package com.proyecto.grupo6.turno_facil.controllers.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.proyecto.grupo6.turno_facil.models.Turno;

public class TurnoDTO{
    public Long id;
    public LocalDate fecha;

    @JsonFormat(pattern ="HH:mm")
    public LocalTime hora;
    public String emailUsuario;
    public String emailNegocio;

    @JsonCreator
    public TurnoDTO (Turno turno){
        this.id=turno.getId();
        this.fecha=turno.getFecha();
        this.hora=turno.getHora();
        this.emailNegocio=turno.getEmailNegocio();
        this.emailUsuario=turno.getEmailUsuario();
    }

    public static TurnoDTO desdeModelo(Turno turno){
        return new TurnoDTO(turno);
    }

    public Turno aModelo(){
        return new Turno(this.id,this.fecha,this.hora,this.emailUsuario,this.emailNegocio);
    }
}