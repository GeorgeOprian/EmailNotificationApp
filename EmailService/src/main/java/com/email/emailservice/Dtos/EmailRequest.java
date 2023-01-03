package com.email.emailservice.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class EmailRequest implements Serializable {

	@JsonProperty("sender")
	private Long sender;

	@JsonProperty("recipients")
	private List<Long> recipients;

	@JsonProperty("emailSubject")
	private String emailSubject;

	@JsonProperty("emailBody")
	private String emailBody;


}
