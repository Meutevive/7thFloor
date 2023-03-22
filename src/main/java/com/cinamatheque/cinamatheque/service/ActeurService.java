package com.cinamatheque.cinamatheque.service;

import com.cinamatheque.cinamatheque.model.Acteur;
import com.cinamatheque.cinamatheque.repository.ActeurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;

@Service
public class ActeurService {

    @Autowired
    private ActeurRepository acteurRepository;


    public Acteur safeActeur (MultipartFile file, String fullname, String birthdate, String description) throws IOException {

        Acteur actor = new Acteur();
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if(fileName.contains("..")){
            System.out.println("not a valid file");
        }
        actor.setPosterActor(Base64.getEncoder().encodeToString(file.getBytes()));
        actor.setFullname(fullname);
        actor.setBirthdate(birthdate);
        actor.setDescription(description);

        acteurRepository.save(actor);
        return actor;
    }

}
