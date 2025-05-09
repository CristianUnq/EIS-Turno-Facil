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

    private String nombreNegocio;

    private String emailUsuario;

    private String emailNegocio;

    private boolean recordatorioEnviado1Dia = false;

    private boolean recordatorioEnviado2Horas = false;

    public Turno(){

    }

    public Turno(Long id, LocalDate fecha, LocalTime hora,String nombreNegocio, String emailUsuario, String emailNegocio){
        this.id=id;
        this.fecha=fecha;
        this.hora=hora;
        this.nombreNegocio=nombreNegocio;
        this.emailUsuario=emailUsuario;
        this.emailNegocio=emailNegocio;
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

    public String getNombreNegocio(){
        return this.nombreNegocio;
    }

    public void setNombreNegocio(String nombre){
        this.nombreNegocio = nombre;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }

    public String getEmailNegocio() {
        return emailNegocio;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public void setEmailNegocio(String emailNegocio) {
        this.emailNegocio = emailNegocio;
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
