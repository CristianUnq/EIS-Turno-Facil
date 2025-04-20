package com.proyecto.grupo6.turno_facil;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.proyecto.grupo6.turno_facil.springSecurity.UsuarioDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class UsuarioTest {
	@Autowired
	UsuarioDetailsServiceImpl usuarioService;

	@BeforeEach
	void contextLoads() {
	}

	@Test
	void test(){
		assertTrue(true);
	}

}
