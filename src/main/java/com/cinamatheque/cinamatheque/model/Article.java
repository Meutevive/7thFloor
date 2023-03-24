package com.cinamatheque.cinamatheque.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;

@Data
@Document
@NoArgsConstructor
public class Article {
    @Id private String id;
    private String title;
    private String description;
    private String content;
    private String cover;
    private Date created_at;
    @DocumentReference
    private List<Comment> commentList;

    public Article(String title, String description, String content, String cover, Date created_at) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.cover = cover;
        this.created_at = created_at;
    }
}