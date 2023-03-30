package com.cinamatheque.cinamatheque.service;


import com.cinamatheque.cinamatheque.model.User;
import com.cinamatheque.cinamatheque.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public User updateUser(){
        return new User();
    };
}
