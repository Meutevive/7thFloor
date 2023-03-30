package com.cinamatheque.cinamatheque.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.MongoId;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Comment {
    @MongoId
    private String id;

    private String content;

    private Date created_at;

    @DocumentReference(collection = "users")
    private User author;
}
