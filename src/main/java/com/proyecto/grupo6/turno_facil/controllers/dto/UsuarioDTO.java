package com.proyecto.grupo6.turno_facil.controllers.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.proyecto.grupo6.turno_facil.models.Usuario;

public class UsuarioDTO{
    public Long id;
    public String nombre;
    public String apellido;
    public String nombreNegocio;
    @JsonFormat(pattern ="HH:mm")
    public String dni;
    public String direccion; 
    public String email;
    public String diasDeAtencion;
    public Integer duracionTurno;
    public String telefono;
    public boolean isNegocio;
    
    @JsonCreator
    public UsuarioDTO (Usuario usuario){
        this.id=usuario.getId();
        this.nombre=usuario.getNombre();
        this.apellido=usuario.getApellido();
        this.nombreNegocio=usuario.getNombreNegocio();
        this.dni=usuario.getDni();
        this.direccion=usuario.getDireccion();
        this.email=usuario.getEmail();
        this.diasDeAtencion=usuario.getDiasDeAtencion();
        this.duracionTurno=usuario.getDuracionTurno();
        this.telefono=usuario.getTelefono();
        this.isNegocio=usuario.isNegocio();
    }

    public static UsuarioDTO desdeModelo(Usuario usuario){
        return new UsuarioDTO(usuario);
    }

    public Usuario aModelo(){
        return new Usuario(id,nombre,apellido,nombreNegocio,dni,direccion,telefono,email,null,duracionTurno,diasDeAtencion,isNegocio);
    }
}