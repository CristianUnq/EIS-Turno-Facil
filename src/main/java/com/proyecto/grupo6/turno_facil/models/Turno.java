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

    private String emailUsuario;

    private String emailNegocio;

    public Turno(Long id, LocalDate fecha, LocalTime hora, String emailUsuario, String emailNegocio){
        this.id=id;
        this.fecha=fecha;
        this.hora=hora;
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
}
