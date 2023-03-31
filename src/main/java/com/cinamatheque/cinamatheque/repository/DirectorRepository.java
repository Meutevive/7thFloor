package com.cinamatheque.cinamatheque.repository;

import com.cinamatheque.cinamatheque.model.Director;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorRepository
        extends MongoRepository<Director, String> {
    Director findByFullname(String fullname);
}