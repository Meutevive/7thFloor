package com.cinamatheque.cinamatheque.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "actor")
@NoArgsConstructor
@AllArgsConstructor
public class Acteur {
    @Id private String id;
    private String fullname;
    private String birthdate;
    private String country;
    private String description;
    private String posterActor;

    public Acteur(String fullname, String birthdate, String country, String description, String posterActor) {
        this.fullname = fullname;
        this.birthdate = birthdate;
        this.country = country;
        this.description = description;
        this.posterActor = posterActor;
    }
}
