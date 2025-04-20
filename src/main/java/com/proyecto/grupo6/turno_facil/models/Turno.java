package com.proyecto.grupo6.turno_facil.models;

import java.sql.Time;
import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "Turno")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Date fecha;

    private Time hora;

    private String emailUsuario;

    private String emailNegocio;

    public Turno(Long id, Date fecha, Time hora, String emailUsuario, String emailNegocio){
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

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Time getHora() {
        return this.hora;
    }

    public void setHora(Time hora) {
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
