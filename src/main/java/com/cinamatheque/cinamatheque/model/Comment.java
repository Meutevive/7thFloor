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

// References suspendues tant que je n'ai pas la solution : DE PALMES
public class Comment {
    // id => Auto-généré par MongoDB
    @Id private String id;

    // Le contenu => Contenu du commentaire
    private String content;

    // Date de creation
    private Date created_at;

    // Type d'element commenté => [Article, Film, Acteur]
    private String type;

    // Commentaire parent => id du commentaire parent, celui auquel on répond
    //    @Nullable
    //    @DocumentReference(collection = "Comment")
    private String parent;

    // Autheur du commentaire => id du user qui a commenté
    //    @DocumentReference(collection = "User")
    private String author;
}
