package com.cinamatheque.cinamatheque.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "comment")
public class Comment {
    @Id
    private String id;

    private String content;

    private Date created_at;

    private String author;
}
