package com.email.emailservice.service.impl;

import com.email.emailservice.Dtos.EmailRequest;
import com.email.emailservice.Dtos.UserEmailResponse;
import com.email.emailservice.exception.UserNotFoundException;
import com.email.emailservice.model.EmailHistory;
import com.email.emailservice.model.Recipient;
import com.email.emailservice.model.User;
import com.email.emailservice.repository.UserRepository;
import com.email.emailservice.service.EmailService;
import com.email.emailservice.service.sender.EmailSenderService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmailServiceImpl implements EmailService {

	private final EmailSenderService emailSender;

	private final UserRepository userRepository;

	public EmailServiceImpl(EmailSenderService emailSender, UserRepository userRepository) {
		this.emailSender = emailSender;
		this.userRepository = userRepository;
	}

	@Override
	public List<UserEmailResponse> loadEmailsForUser(Long userId) {
		Optional<User> userOpt = userRepository.findById(userId);
		if (userOpt.isEmpty()) {
			throw new UserNotFoundException("Sender with id: " + userId + " was not found.");
		}

		User user = userOpt.get();
		List<UserEmailResponse> response = new ArrayList<>();
		for (EmailHistory email : user.getEmails()) {
			UserEmailResponse ur = new UserEmailResponse();

			ur.setSubject(email.getSubject());
			ur.setContent(email.getContent());
			List<String> recipientsEmails = getRecipientsEmails(email.getRecipients());
			ur.setEmailAddresses(recipientsEmails);

			response.add(ur);
		}

		return response;
	}

	private List<String> getRecipientsEmails(List<Recipient> recipients) {
		List<String> emailAddresses = new ArrayList<>();
		for (Recipient recipient : recipients) {
			Optional<User> recipientOpt = userRepository.findById(recipient.getRecipientId());

			if (recipientOpt.isEmpty()) {
				throw new UserNotFoundException("User with id: " + recipient.getRecipientId() + " was not found.");
			}
			emailAddresses.add(recipientOpt.get().getEmailAddress());
		}
		return emailAddresses;
	}

	@Override
	public String sendEmail(EmailRequest requestBody) {

		Optional<User> senderOpt = userRepository.findById(requestBody.getSender());
		if (senderOpt.isEmpty()) {
			throw new UserNotFoundException("Sender with id: " + requestBody.getSender() + " was not found.");
		}

		List<User> recipients;
		if (requestBody.getRecipients() != null && !requestBody.getRecipients().isEmpty()) {
			List<Long> inputUsers = requestBody.getRecipients();
			recipients = userRepository.findAllById(inputUsers);
			if (inputUsers.size() != recipients.size()) {
				findNotFoundUsersAndThrow(inputUsers, recipients);
			}

		} else {
			recipients = userRepository.findAll();
		}

		List<String> recipientsEmailAddresses = recipients.stream().map(User::getEmailAddress).collect(Collectors.toList());

		emailSender.sendSimpleEmail(requestBody.getEmailSubject(), recipientsEmailAddresses, requestBody.getEmailBody());

		saveSentEmails(senderOpt.get(), requestBody);

		return buildResponseMessage(requestBody);
	}

	private void saveSentEmails(User sender, EmailRequest requestBody) {
		List<EmailHistory> senderEmails = sender.getEmails();
		if(senderEmails == null || senderEmails.isEmpty()) {
			senderEmails = new ArrayList<>();
		}
		EmailHistory email = createNewEmailHistory(sender, requestBody);
		senderEmails.add(email);

		sender.setEmails(senderEmails);
		
		userRepository.save(sender);
	}

	private EmailHistory createNewEmailHistory(User sender, EmailRequest requestBody) {
		EmailHistory eh = new EmailHistory();
		
		eh.setContent(requestBody.getEmailBody());
		eh.setSubject(requestBody.getEmailSubject());
		eh.setSender(sender);

		List<Recipient> recipients = createRecipients(requestBody, eh);
		eh.setRecipients(recipients);

		return eh;
	}

	private List<Recipient> createRecipients(EmailRequest requestBody, EmailHistory eh) {
		List<Recipient> recipients = new ArrayList<>();
		for (Long recipientId : requestBody.getRecipients()) {
			Recipient recipient= new Recipient();
			recipient.setEmail(eh);
			recipient.setRecipientId(recipientId);

			recipients.add(recipient);
		}
		return recipients;
	}

	private void findNotFoundUsersAndThrow(List<Long> inputUsers, List<User> foundUsers) {
		Set<Long> foundUsersIds = foundUsers.stream().map(User::getId).collect(Collectors.toSet());

		Set<Long> inputUsersIds = new HashSet<>(inputUsers);

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
