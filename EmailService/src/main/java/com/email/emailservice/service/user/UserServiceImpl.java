package com.email.emailservice.service.user;

import com.email.emailservice.Dtos.UserRequest;
import com.email.emailservice.model.User;
import com.email.emailservice.repository.UserRepository;
import com.email.emailservice.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository repository;

	public UserServiceImpl(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public String handleUserOperation(UserRequest request) {
		if (request.getOperation().equals(0)) {
			System.out.println("Sterge user");
			repository.deleteById(request.getId());
		} else if (request.getOperation().equals(1) || request.getOperation().equals(2)) {
			User user = createUserFromRequest(request);
			System.out.println("Salveaza user");
			repository.save(user);
		} else {
			return "Operation " + request.getOperation() + " is not valid.";
		}
		System.out.println("A terminat user operation");
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
