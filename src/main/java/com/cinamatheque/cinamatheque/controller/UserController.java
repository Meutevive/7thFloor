package com.cinamatheque.cinamatheque.controller;


import com.cinamatheque.cinamatheque.dto.UserDto;
import com.cinamatheque.cinamatheque.model.Gender;
import com.cinamatheque.cinamatheque.model.User;
import com.cinamatheque.cinamatheque.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping()
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username){
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> putUser(@RequestBody UserDto userDto){
        Optional<User> optionalUser = userRepository.findByUsername(userDto.getUsername());

        if (optionalUser.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }

        User user = optionalUser.get();
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setEmail(userDto.getEmail());
        user.setPostcode(userDto.getPostcode());
        user.setAddress(userDto.getAddress());
        user.setCountry(userDto.getCountry());
        user.setPhone(userDto.getPhone());

        switch (userDto.getGender()){
            case "M" -> user.setGender(Gender.MALE);
            case "F" -> user.setGender(Gender.FEMALE);
            case "Autre" -> user.setGender(Gender.OTHER);
        }

        return new ResponseEntity<>(userRepository.save(user), HttpStatus.ACCEPTED);
    }
}
