package com.cinamatheque.cinamatheque.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@Document(collection = "film")
@AllArgsConstructor
@NoArgsConstructor
public class Film {
    @Id private String id;

    private String title;

    private String description;

    private String poster;

    private String pubDate;

    private List<String> genres;

    private List<String> actors;

    private List<String> directors;

    private Float note;

    @DocumentReference(collection = "comment", lazy = true)
    private List<Comment> commentList;
}