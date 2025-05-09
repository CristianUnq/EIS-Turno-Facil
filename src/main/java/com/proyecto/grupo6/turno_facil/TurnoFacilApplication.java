package com.proyecto.grupo6.turno_facil;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class TurnoFacilApplication {

	public static void main(String[] args) {
		SpringApplication.run(TurnoFacilApplication.class, args);
	}

}
