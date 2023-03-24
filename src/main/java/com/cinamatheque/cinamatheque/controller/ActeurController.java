package com.cinamatheque.cinamatheque.controller;

import com.cinamatheque.cinamatheque.model.Acteur;
import com.cinamatheque.cinamatheque.repository.ActeurRepository;
import com.cinamatheque.cinamatheque.service.ActeurService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/acteur")
@AllArgsConstructor
public class ActeurController {

    public ActeurService acteurService;
    public ActeurRepository repository;

    // Create actor to populate actor
    // add image actor
    // get actor by id
    @GetMapping("/{id}")
    public Acteur findActeurById(@PathVariable String id){
        return repository.findById(id).get();
    }
   @PostMapping
   public Acteur CreateActeur (@RequestParam("file") MultipartFile file,
                              @RequestParam("fullname") String fullname,
                              @RequestParam("birthdate") Date birthdate,
                              @RequestParam("country") String country,
                              @RequestParam("description") String description

   ) throws IOException {
       return acteurService.saveActeur(file, fullname, birthdate, country, description);
   }


    //    get actor inside data bas
    @GetMapping
    public List<Acteur> getActeurs() {
        return repository.findAll();
    }

    //    get actor by firstname
    @GetMapping("/search/{fullname}")
    public List<Acteur> findActeurByFullname(@RequestParam String fullname){
       System.out.print(fullname);
        return repository.findByFullnameLike(fullname);
    }

    // modify existing actor inside database
    @PutMapping()
    public Acteur modifyActeur(@RequestBody Acteur acteurRequest){
        //get the existing document from DB
        //populate new value from request to existing object/entity/document
        Acteur existingActeur = repository.findById(acteurRequest.getId()).stream().findFirst().orElse(null);
        existingActeur.setFullname(acteurRequest.getFullname());
        existingActeur.setBirthdate(acteurRequest.getBirthdate());
        existingActeur.setDescription(acteurRequest.getDescription());
        return repository.save(existingActeur);
    }

    //deleting actor inside database
    @DeleteMapping("/{id}")
    public String removeActeur(@PathVariable String id){
        repository.deleteById(id);
        return "deleting successfully";
    }
}
