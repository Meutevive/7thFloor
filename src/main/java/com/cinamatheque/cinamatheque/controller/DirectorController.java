package com.cinamatheque.cinamatheque.controller;

import com.cinamatheque.cinamatheque.model.Director;
import com.cinamatheque.cinamatheque.repository.DirectorRepository;
import com.cinamatheque.cinamatheque.service.DirectorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path="/api/v1/director")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class DirectorController {

    public DirectorRepository directorRepository;
    public DirectorService directorService;

    @GetMapping
    public List<Director> getDirectors(){
        return directorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Director getDirector(@PathVariable String id){
        return directorRepository.findById(id).get();
    }

    @PostMapping()
    public ResponseEntity<Director> postDirector(@RequestParam("fullname") String fullname,
                                                 @RequestParam("birthdate") Date birthdate,
                                                 @RequestParam("country") String country,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("poster")MultipartFile poster) throws IOException {
        return directorService.save(fullname, birthdate, country, description, poster);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id){
        directorRepository.deleteById(id);
    }
}