package com.cinamatheque.cinamatheque.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.msgpack.jackson.dataformat.MessagePackExtensionType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
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

//    @JsonSerialize(using = MessagePackExtensionType.Serializer.class)
    @DocumentReference(collection = "comment", lazy = true)
//    @DBRef
    private List<Comment> commentList;
}
