package com.cinamatheque.cinamatheque.controller;


import com.cinamatheque.cinamatheque.model.Comment;
import com.cinamatheque.cinamatheque.repository.CommentRepository;
import com.cinamatheque.cinamatheque.service.CommentService;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/comment")
public class CommentController {
    private final CommentRepository commentRepository;
    private final CommentService commentService;
    @GetMapping
    public List<Comment> getAllComments(){
        return commentService.getAllComments();
    }

    @GetMapping
    public Optional<Comment> getComment(@RequestParam("id") String id){
        return commentService.getCommentByid(id);
    }

    @PostMapping
    public Comment postComment(@RequestParam("content") String content,
                               @RequestParam("type") String type,
                               @RequestParam("parent") String parent_id,
                               @RequestParam("author") String author_id){
        return commentService.save(content, type, parent_id, author_id);
    }

    @PutMapping
    public Comment putComment(Comment comment){
        return commentService.put(comment);
    }
}
