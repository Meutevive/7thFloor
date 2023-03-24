package com.cinamatheque.cinamatheque.model;

import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.Optional;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id private String id;
    private String content;
    private Date created_at;
    private String type;
    @Nullable
    @DocumentReference(collection = "Comment")
    private String parent;
    @DocumentReference(collection = "User")
    private String author;

}
