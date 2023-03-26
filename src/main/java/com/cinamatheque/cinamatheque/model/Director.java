package com.cinamatheque.cinamatheque.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document
public class Director {
    @Id private String id;
    private String fullname;
    private Date birthdate;
    private String country;
    private String description;
    private String poster;
}