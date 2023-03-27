package com.cinamatheque.cinamatheque.dto;

import com.cinamatheque.cinamatheque.model.Film;
import com.cinamatheque.cinamatheque.model.Gender;
import com.cinamatheque.cinamatheque.model.Role;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class UserDto {
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String gender;
    private String postcode;
    private String address;
    private String country;
    private String phone;
}