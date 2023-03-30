package com.cinamatheque.cinamatheque.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Data
@Document

public class User implements UserDetails {
    @Id private String id;
    @Indexed(unique = true) private String username;
    private String firstname;
    private String lastname;
    private String password;
    @Indexed(unique = true) private String email;
    private Gender gender;
    private Role role;
    private String postcode;
    private String address;
    private String country;
    private String phone;
    private Date created_at;

    @DocumentReference
    private List<Film> favoris;

    /*
     * each @param must not be {@literal null} or empty.
     */
    public User(@NonNull String username, @NonNull String firstname, @NonNull String lastname, @NonNull String email, @NonNull String password) {
        Assert.hasText(username, "Username is required");
        Assert.hasText(firstname, "firstname is required");
        Assert.hasText(lastname, "lastname is required");
        Assert.hasText(password, "password is required");
        Assert.hasText(email, "email is required");

        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
    }

    public User(){}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public String getEmail(){
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}