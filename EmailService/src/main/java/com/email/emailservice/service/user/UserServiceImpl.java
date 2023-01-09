package com.email.emailservice.service.user;

import com.email.emailservice.Dtos.UserRequest;
import com.email.emailservice.model.User;
import com.email.emailservice.repository.UserRepository;
import com.email.emailservice.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	private final UserRepository repository;

	public UserServiceImpl(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public String handleUserOperation(UserRequest request) {
		logger.debug("Enter User Operation");
		if (request.getOperation().equals(0)) {
			logger.debug("Delete User");
			repository.deleteById(request.getId());
		} else if (request.getOperation().equals(1) || request.getOperation().equals(2)) {
			logger.debug("Create/update User");
			User user = createUserFromRequest(request);
			repository.save(user);
		} else {
			return "Operation " + request.getOperation() + " is not valid.";
		}

		return "User data saved.";
	}

	private User createUserFromRequest(UserRequest request) {
		User newUser = new User();
		newUser.setId(request.getId());
		newUser.setUserName(request.getUserName());
		newUser.setEmailAddress(request.getEmailAddress());
		return newUser;
	}
}
