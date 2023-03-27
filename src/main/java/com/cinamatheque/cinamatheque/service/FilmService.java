package com.cinamatheque.cinamatheque.service;


import com.cinamatheque.cinamatheque.model.Film;
import com.cinamatheque.cinamatheque.repository.FilmRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

@AllArgsConstructor
@Service
public class FilmService {

    private final FilmRepository filmRepository;

    public ResponseEntity<ArrayList<Film>> getFilmsBypagination(int pageNo, int pageSize, String sortBy, String sortDir, String genre) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Film> films = filmRepository.findAll(pageable);

        ArrayList<Film> filteredFilms = new ArrayList<Film>();
        if (genre != ""){
            for (Film film: films){
                if (film.getGenres().contains(genre)){
                    filteredFilms.add(film);
                }
            }
        }
        // get content for requested page
        return new ResponseEntity<>(filteredFilms, HttpStatus.OK);
    }

    public Film saveFilm (MultipartFile file, String title, String description, String pubDate, List<String> genres, List<String> actors, List<String> directors) throws IOException {

        Film film = new Film();
        film.setPoster(Base64.getEncoder().encodeToString(file.getBytes()));
        film.setTitle(title);
        film.setDescription(description);
        film.setPubDate(pubDate);
        film.setGenres(genres);
        film.setActors(actors);
        film.setDirectors(directors);


        return filmRepository.save(film);
    }
}