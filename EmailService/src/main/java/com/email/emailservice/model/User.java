package com.email.emailservice.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "EMAIL_USER")
public class User {

	@Id
	@Column(name = "USER_ID")
	private Long id;

	@Column(name = "USER_NAME")
	private String userName;

	@Column(name = "EMAIL")
	private String emailAddress;

	@OneToMany(mappedBy = "sender", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<EmailHistory> emails;

}
