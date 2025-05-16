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
    public UsuarioDTO negocio;
    public UsuarioDTO usuario;

    @JsonCreator
    public TurnoDTO (Turno turno){
        this.id=turno.getId();
        this.fecha=turno.getFecha();
        this.hora=turno.getHora();
        this.negocio=new UsuarioDTO(turno.getNegocio());
        this.usuario=new UsuarioDTO(turno.getUsuario());
    }

    public static TurnoDTO desdeModelo(Turno turno){
        return new TurnoDTO(turno);
    }

    public Turno aModelo(){
        return new Turno(this.id,this.fecha,this.hora,this.negocio.aModelo(),this.usuario.aModelo());
    }
}