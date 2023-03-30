package com.cinamatheque.cinamatheque;

import com.cinamatheque.cinamatheque.model.Acteur;
import com.cinamatheque.cinamatheque.repository.ActeurRepository;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@SpringBootTest
public class SampleDateLoaderTest implements CommandLineRunner {
    @Autowired
    ActeurRepository acteurRepository;

    Faker faker = new Faker();


    Acteur acteur = new Acteur();

    public void run (String[] args){

        List<Acteur> actor = IntStream.rangeClosed(1,10)
                .mapToObj(i -> new Acteur(
                        faker.name().fullName(),
                        faker.date().toString(),
                        faker.lorem().characters(),
                        faker.lorem().paragraph(),
                        faker.lorem().paragraph()
                )).collect(Collectors.toList());


        acteurRepository.saveAll(actor);
    }
}
