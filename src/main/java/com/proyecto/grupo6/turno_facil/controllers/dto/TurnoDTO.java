package com.proyecto.grupo6.turno_facil.controllers.dto;

import java.sql.Date;
import java.sql.Time;

import com.proyecto.grupo6.turno_facil.models.Turno;

public class TurnoDTO{
    private Long id;
    private Date fecha;
    private Time hora;
    private String emailUsuario;
    private String emailNegocio;

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