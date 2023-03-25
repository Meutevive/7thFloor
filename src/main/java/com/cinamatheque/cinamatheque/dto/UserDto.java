package com.cinamatheque.cinamatheque.dto;

import com.cinamatheque.cinamatheque.model.User;
import com.cinamatheque.cinamatheque.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
public class UserDto {
    private String username;
}
