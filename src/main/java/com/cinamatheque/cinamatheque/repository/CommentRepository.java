package com.cinamatheque.cinamatheque.repository;

import com.cinamatheque.cinamatheque.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
}
