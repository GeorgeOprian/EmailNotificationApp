package com.email.emailservice.service.impl;

import com.email.emailservice.Dtos.EmailRequest;
import com.email.emailservice.exception.UserNotFoundException;
import com.email.emailservice.model.User;
import com.email.emailservice.repository.UserRepository;
import com.email.emailservice.service.EmailService;
import com.email.emailservice.service.sender.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private EmailSenderService emailSender;

	@Autowired
	private UserRepository userRepository;

	@Override
	public String sendEmail(EmailRequest requestBody) {

		List<User> users;
		if (requestBody.getRecipients() != null && !requestBody.getRecipients().isEmpty()) {
			List<Long> inputUsers = requestBody.getRecipients();
			users = userRepository.findAllById(inputUsers);
			if (inputUsers.size() != users.size()) {
				findNotFoundUsersAndthrow(inputUsers, users);
			}

		} else {
			users = userRepository.findAll();
		}


		List<String> recipients = users.stream().map(user -> user.getEmail()).collect(Collectors.toList());

		emailSender.sendSimpleEmail(requestBody.getEmailSubject(), recipients, requestBody.getEmailBody());

		return buildResponseMessage(requestBody);
	}

	private void findNotFoundUsersAndthrow(List<Long> inputUsers, List<User> foundUsers) {
		Set<Long> foundUsersIds = foundUsers.stream().map(user -> user.getId()).collect(Collectors.toSet());

		Set<Long> inputUsersIds = inputUsers.stream().collect(Collectors.toSet());

		inputUsersIds.removeAll(foundUsersIds);

		String errorMessage;

		if (inputUsersIds.size() > 1) {
			errorMessage = inputUsersIds.stream().map(String::valueOf).collect(Collectors.joining(" ", "Users with ids: ", " were not found."));
		} else {
			errorMessage = inputUsersIds.stream().map(String::valueOf).collect(Collectors.joining("", "User with id ", " was not found."));
		}

		throw new UserNotFoundException(errorMessage);
	}


	private String buildResponseMessage(EmailRequest requestBody) {
		StringBuilder responseMessage;

		if (requestBody.getRecipients() == null || requestBody.getRecipients().isEmpty()) {
			responseMessage = new StringBuilder("An e-mail was sent to all users.");
		} else {
			responseMessage = new StringBuilder("An e-mail was sent to users: ");
			for (Long recipient : requestBody.getRecipients()) {
				responseMessage.append(recipient).append(" ");
			}
		}

		return responseMessage.toString();
	}

}
