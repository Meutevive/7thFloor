package com.cinamatheque.cinamatheque.service;


import com.cinamatheque.cinamatheque.model.Comment;
import com.cinamatheque.cinamatheque.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<Comment> getAllComments(){
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentByid(String id) {
        return commentRepository.findById(id);
    }

    public Comment put(Comment comment) {
        return comment;
    }

    public Comment save(String content, String type, String parent_id, String author_id){
        // Getting the current date for the created_at field
        Date currentDate = new Date();

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setType(type);
        comment.setCreated_at(currentDate);
        comment.setParent(parent_id);
        comment.setAuthor(author_id);

        System.out.print(comment);

        return commentRepository.save(comment);
    }

    public void delete(String id) {
        commentRepository.deleteById(id);
    }
}
