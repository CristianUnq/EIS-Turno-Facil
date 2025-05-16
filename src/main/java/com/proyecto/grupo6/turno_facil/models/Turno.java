package com.proyecto.grupo6.turno_facil.models;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;

@Entity
@Table(name = "Turno")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;

    private LocalTime hora;

    @ManyToOne
    @JoinColumn(name = "email_usuario", referencedColumnName = "email")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "email_negocio", referencedColumnName = "email")
    private Usuario negocio;

    private boolean recordatorioEnviado1Dia = false;

    private boolean recordatorioEnviado2Horas = false;

    public Turno(){

    }

    public Turno(Long id, LocalDate fecha, LocalTime hora,Usuario negocio, Usuario usuario){
        this.id=id;
        this.fecha=fecha;
        this.hora=hora;
        this.usuario=usuario;
        this.negocio=negocio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHora() {
        return this.hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }


    public Usuario getUsuario() {
        return usuario;
    }

    public Usuario getNegocio() {
        return negocio;
    }

    public boolean isRecordatorioEnviado1Dia() {
        return recordatorioEnviado1Dia;
    }

    public boolean isRecordatorioEnviado2Horas() {
        return recordatorioEnviado2Horas;
    }

    public void setRecordatorioEnviado1Dia(boolean recordatorioEnviado1Dia) {
        this.recordatorioEnviado1Dia = recordatorioEnviado1Dia;
    }

    public void setRecordatorioEnviado2Horas(boolean recordatorioEnviado2Horas) {
        this.recordatorioEnviado2Horas = recordatorioEnviado2Horas;
    }
}
