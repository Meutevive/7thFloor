package com.cinamatheque.cinamatheque.controller;

import com.cinamatheque.cinamatheque.model.Article;
import com.cinamatheque.cinamatheque.repository.ArticleRepository;
import com.cinamatheque.cinamatheque.service.ArticleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/article")
public class ArticleController {

    private final ArticleRepository articleRepository;
    private final ArticleService articleService;

    @GetMapping
    public List<Article> getAllArticle(){
        return articleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Article> getArticle(@RequestParam("id") String id){
        return articleRepository.findById(id);
    }

    @PostMapping
    public Article postArticle(@RequestParam("title") String title,
                               @RequestParam("description") String description,
                               @RequestParam("content") String content,
                               @RequestParam("cover")MultipartFile cover
                               ) throws IOException {
        return articleService.save(title, description, content, cover);
    }

    @PutMapping
    public Article putArticle(Article article){
        return article;
    }
}
