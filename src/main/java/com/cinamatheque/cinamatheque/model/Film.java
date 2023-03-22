package com.cinamatheque.cinamatheque.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.Date;

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
    private ArrayList<String> genres;
    private ArrayList<String> actors;
    private ArrayList<String> directors;
    private Float note;

}