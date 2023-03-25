package com.cinamatheque.cinamatheque.dto;


import com.cinamatheque.cinamatheque.model.Comment;
import com.cinamatheque.cinamatheque.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    private String content;
    private String author;
}
