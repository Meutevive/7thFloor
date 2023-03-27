package com.cinamatheque.cinamatheque.service;


import com.cinamatheque.cinamatheque.model.Director;
import com.cinamatheque.cinamatheque.repository.DirectorRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;

@Service
@AllArgsConstructor
public class DirectorService  {
    public DirectorRepository directorRepository;

    public ResponseEntity<Director> save(String fullname, Date birthdate, String country, String description, MultipartFile poster) throws IOException {
        Director director = new Director();

        director.setFullname(fullname);
        director.setBirthdate(birthdate);
        director.setDescription(description);
        director.setCountry(country);
        director.setPoster(Base64.getEncoder().encodeToString(poster.getBytes()));

        return new ResponseEntity<>(directorRepository.save(director), HttpStatus.CREATED);
    }
}
