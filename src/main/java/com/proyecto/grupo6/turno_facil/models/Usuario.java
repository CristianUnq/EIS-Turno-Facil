package com.proyecto.grupo6.turno_facil.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "Usuario")
public class Usuario implements Serializable {

    private String nombre;

    private String apellido;

    private String nombreNegocio;

    private String dni;

    private String direccion;

    private String telefono;

    @Id
    private String email;

    private String contrasenia;

    private Integer duracionTurno;

    private String diasDeAtencion;

    private Boolean isNegocio;

    private String recoveryToken;

    private LocalDateTime tokenExpireTime;

    public Usuario(String nombre, String apellido, String nombreNegocio, String dni, String direccion,
            String telefono, String email, String contrasenia, Integer duracionTurno, String diasDeAtencion,
            Boolean isNegocio) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreNegocio = nombreNegocio;
        this.dni = dni;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.contrasenia = contrasenia;
        this.duracionTurno = duracionTurno;
        this.diasDeAtencion = diasDeAtencion;
        this.isNegocio = isNegocio;
    }



    public Usuario(){}

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNombreNegocio() {
        return nombreNegocio;
    }

    public void setNombreNegocio(String nombreNegocio) {
        this.nombreNegocio = nombreNegocio;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public Integer getDuracionTurno() {
        return duracionTurno;
    }

    public void setDuracionTurno(Integer duracionTurno) {
        this.duracionTurno = duracionTurno;
    }

    public String getDiasDeAtencion() {
        return diasDeAtencion;
    }

    public void setDiasDeAtencion(String diasDeAtencion) {
        this.diasDeAtencion = diasDeAtencion;
    }

    public Boolean isNegocio() { return isNegocio; }

    public void setIsNegocio(Boolean isNegocio) {
        this.isNegocio = isNegocio;
    }



    public void setRecoveryToken(String token) {
        this.recoveryToken=token;
    }



    public void setTokenExpireTime(LocalDateTime expireTime) {
        this.tokenExpireTime=expireTime;
    }



    public LocalDateTime getTokenExpireTime() {
        return tokenExpireTime;
    }
}
