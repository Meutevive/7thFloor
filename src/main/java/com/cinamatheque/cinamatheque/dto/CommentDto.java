package com.cinamatheque.cinamatheque.dto;


import com.cinamatheque.cinamatheque.model.Comment;
import com.cinamatheque.cinamatheque.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    private String content;

    private User author;

    public Comment toComment(){
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAuthor(author);
        return comment;
    }
}
