package com.email.emailservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "EMAIL_HISTORY")
public class EmailHistory {

	@Id
	@Column(name = "EMAIL_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "MESSAGE")
	private String message;

	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User user;

}
