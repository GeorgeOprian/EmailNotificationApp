package com.email.emailservice.service.mailsender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailServiceCaller {

	@Autowired
	private JavaMailSender javaMailSender;

	public void sendSimpleEmail(String emailSubject, List<String> emailTo, String body) {
		SimpleMailMessage message = new SimpleMailMessage();

		String[] recipients = emailTo.stream().toArray(String[]::new);

		message.setTo(recipients);
		message.setSubject(emailSubject);
		message.setText(body);
		
		javaMailSender.send(message);

		for (String recipient : recipients) {
			System.out.println("Mail sent to " + recipient);
		}
	}
}
