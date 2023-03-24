package com.cinamatheque.cinamatheque.controller;

import com.cinamatheque.cinamatheque.model.Film;
import com.cinamatheque.cinamatheque.repository.FilmRepository;
import com.cinamatheque.cinamatheque.service.FilmService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/films")
@AllArgsConstructor
public class FilmController {
    public FilmService filmService;
    public FilmRepository filmRepository;

    //safe film inside database with file safe
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Film createFilm(@RequestParam("file") MultipartFile file,
                           @RequestParam("title") String title,
                           @RequestParam("description") String description,
                           @RequestParam("pubDate") String pubDate,
                           @RequestParam("genres") ArrayList<String> genres,
                           @RequestParam("actors") ArrayList<String> actors,
                           @RequestParam("directors") ArrayList<String> directors
    ) throws IOException {
        System.out.print(title);
        return filmService.saveFilm(file, title, description, pubDate, genres, actors, directors) ;
    }

//     get film with pagination
    @GetMapping
    public List<Film> getAllFilm(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "5") int size,
                                 @RequestParam(defaultValue = "title") String sortby)
    {
        return filmService.getFilmsBypagination(page, size, sortby, "ASC");
    }

    // get film by id
    @GetMapping("/{id}")
    public Film getFilmById(@PathVariable String id){
        return filmRepository.findById(id).get();
    }


    // get film by date se sorti
    @GetMapping("/search/{pubDate}")
    public Film getFilmWithDate(@PathVariable Date pubDate){
        return filmRepository.findByPubDate(pubDate) ;
    }


    // get film by title
    @GetMapping("/search/{title}")
    public List<Film> getFilmsByTitle(@PathVariable String title){
        return filmRepository.findByTitle(title);
    }


    //modification des film
    @PutMapping
    public Film modifyFilm(@RequestBody Film filmRequest){
        //get the existing document from DB
        //populate new value from request to existing object/entity/document

        Film existingFilm = filmRepository.findById(filmRequest.getId()).get();
        existingFilm.setTitle(filmRequest.getTitle());
        existingFilm.setDescription(filmRequest.getDescription());
        existingFilm.setPubDate(filmRequest.getPubDate());
        existingFilm.setGenres(filmRequest.getGenres());
        existingFilm.setActors(filmRequest.getActors());
        existingFilm.setDirectors(filmRequest.getDirectors());
        return filmRepository.save(existingFilm);
    }


    // deleting film
    @DeleteMapping("/{id}")
    public String removeFilm(@PathVariable String id){
        filmRepository.deleteById(id);
        return "film deleted from database";
    }
}