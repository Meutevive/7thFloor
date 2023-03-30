package com.cinamatheque.cinamatheque.service;

import com.cinamatheque.cinamatheque.model.Article;
import com.cinamatheque.cinamatheque.repository.ArticleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;

@Service
@AllArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public Article save(String title, String description, String content, MultipartFile cover) throws IOException {
        // Getting the current date for the created_at field
        Date currentDate = new Date();

        // Fetching params
        Article article = new Article();
        article.setTitle(title);
        article.setDescription(description);
        article.setContent(content);
        article.setCreated_at(currentDate);

        // Encoding cover image to base64 String
        article.setCover(Base64.getEncoder().encodeToString(cover.getBytes()));

        return articleRepository.save(article);
    }
}
