package com.cinamatheque.cinamatheque.service;


import com.cinamatheque.cinamatheque.model.Comment;
import com.cinamatheque.cinamatheque.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setType(type);
        comment.setParent(parent_id);
        comment.setAuthor(author_id);

        return commentRepository.save(comment);
    }
}
