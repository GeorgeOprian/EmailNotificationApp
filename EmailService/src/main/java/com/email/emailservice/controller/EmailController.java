package com.email.emailservice.controller;

import com.email.emailservice.Dtos.EmailRequest;
import com.email.emailservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/newemail")
public class EmailController {

	@Autowired
	private EmailService service;

	@PostMapping
	public ResponseEntity<String> sendEmailToAllUsers(@RequestBody EmailRequest body) {

		String response = service.sendEmail(body);

		return ResponseEntity.ok(response);
	}


}
