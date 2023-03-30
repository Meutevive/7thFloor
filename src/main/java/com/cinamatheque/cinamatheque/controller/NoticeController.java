package com.cinamatheque.cinamatheque.controller;

import com.cinamatheque.cinamatheque.model.Notice;
import com.cinamatheque.cinamatheque.service.NoticeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/notice")
@AllArgsConstructor
public class NoticeController {
    private NoticeService noticeService;
    @PostMapping
    public ResponseEntity<Notice> createNotice(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Notice>(noticeService.createNotice(payload.get("noticeTitle"), payload.get("filmId")), HttpStatus.CREATED);
    }
}

