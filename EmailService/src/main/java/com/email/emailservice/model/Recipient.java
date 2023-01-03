package com.email.emailservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "EMAIL_RECIPIENT")
public class Recipient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "EMAIL_ID")
	private EmailHistory email;

	@Column(name = "RECIPIENT_ID")
	private Long recipientId;

}
