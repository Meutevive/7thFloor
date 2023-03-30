package com.cinamatheque.cinamatheque.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;

@Data
@Document(collection = "token")
public class PasswordResetToken {
    private static final int EXPIRATION = 60 * 24;

    @MongoId
    private String id;
    private String token;
    @DocumentReference(collection = "user")
    private User user;
    private Date expirationDate;

    public PasswordResetToken(String token, User user, Date expirationDate) {
        this.token = token;
        this.user = user;
        this.expirationDate = expirationDate;
    }
}
