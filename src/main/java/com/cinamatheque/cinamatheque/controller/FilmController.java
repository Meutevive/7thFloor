package com.cinamatheque.cinamatheque.controller;

import com.cinamatheque.cinamatheque.model.Comment;
import com.cinamatheque.cinamatheque.model.Film;
import com.cinamatheque.cinamatheque.model.User;
import com.cinamatheque.cinamatheque.repository.CommentRepository;
import com.cinamatheque.cinamatheque.repository.FilmRepository;
import com.cinamatheque.cinamatheque.repository.UserRepository;
import com.cinamatheque.cinamatheque.service.FilmService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/films")
@AllArgsConstructor
public class FilmController {
    private final FilmService filmService;
    private final FilmRepository filmRepository;
    private final UserRepository userRepository;

    // // // // FILMS PART // // // //
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Film createFilm(@RequestParam("file") MultipartFile file,
                           @RequestParam("title") String title,
                           @RequestParam("description") String description,
                           @RequestParam("pubDate") String pubDate,
                           @RequestParam("genres") List<String> genres,
                           @RequestParam("actors") List<String> actors,
                           @RequestParam("directors") List<String> directors
    ) throws IOException {
        System.out.print(title);
        return filmService.saveFilm(file, title, description, pubDate, genres, actors, directors) ;
    }

//     get film with pagination
    @GetMapping
    public ResponseEntity<Page<Film>> getAllFilm(@RequestParam(name = "page", defaultValue = "0") int page,
                                                 @RequestParam(name = "size", defaultValue = "5") int size,
                                                 @RequestParam(name = "sort", defaultValue = "title") String sortby)
    {
        return filmService.getFilmsBypagination(page, size, sortby, "ASC");
    }

    // get film by id
    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable String id){
        return new ResponseEntity<>(filmRepository.findById(id).get(), HttpStatus.OK);
    }


    // get film by date se sorti
    @GetMapping("/search")
    public Film getFilmWithDate(@RequestParam("pubdate") Date pubDate){
        return filmRepository.findByPubDate(pubDate);
    }


    // get film by title
    @GetMapping("/search/{title}")
    public List<Film> getFilmsByTitle(@PathVariable String title)
    {
        return filmRepository.findAllByTitleLike(title);
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

    // deleting all films
    @DeleteMapping
    public String deleteAllFilms(){
        filmRepository.deleteAll();
        return "All films has been deleted";
    }


    // // // // COMMENTS PART // // // //

    private final CommentRepository commentRepository;

    @PostMapping("/{id}/comment")
    public ResponseEntity<Film> addComment(@PathVariable String id,
                                           @RequestParam("content") String content,
                                           @RequestParam("author") String author){
        Optional<Film> optionalFilm = filmRepository.findById(id);

        if (optionalFilm.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAuthor(author);

        Comment newComment = commentRepository.save(comment);

        Film filmToUpdate = optionalFilm.get();
        List<Comment> commentList = filmToUpdate.getCommentList();

        System.out.print(commentList);

        commentList.add(newComment);

        System.out.print(commentList);

        filmToUpdate.setCommentList(commentList);

        Film updatedFilm = filmRepository.save(filmToUpdate);

        return new ResponseEntity<>(updatedFilm, HttpStatus.OK);
    }
}