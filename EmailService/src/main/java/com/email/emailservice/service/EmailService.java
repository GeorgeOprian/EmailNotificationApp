package com.email.emailservice.service;

import com.email.emailservice.Dtos.EmailRequest;

public interface EmailService {

	String sendEmail(EmailRequest request);

}
