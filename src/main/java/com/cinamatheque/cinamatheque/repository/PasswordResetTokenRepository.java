package com.cinamatheque.cinamatheque.repository;

import com.cinamatheque.cinamatheque.model.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {
    PasswordResetToken findByToken(String token);

}
