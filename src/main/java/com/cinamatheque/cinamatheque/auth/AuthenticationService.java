package com.cinamatheque.cinamatheque.auth;


import com.cinamatheque.cinamatheque.model.PasswordResetToken;
import com.cinamatheque.cinamatheque.model.Role;
import com.cinamatheque.cinamatheque.model.User;
import com.cinamatheque.cinamatheque.repository.UserRepository;
import com.cinamatheque.cinamatheque.service.EmailService;
import com.cinamatheque.cinamatheque.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationResponse register(RegisterRequest request) {
            User user = new User(request.getUsername(), request.getFirstname(), request.getLastname(), request.getEmail(), passwordEncoder.encode(request.getPassword()));
            user.setRole(Role.USER);
            emailService.sendEmail(user.getEmail(), "Registration", "Bienvenu sur cinamatheque");
            userRepository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticateRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public ResponseEntity<String> forgotpassword(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User user = new User();
        if (optionalUser.isEmpty()){
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }else{
            user = optionalUser.get();
        }

        String token = UUID.randomUUID().toString();
        String url = "http://localhost:3000/newpassword?token="+token;
        createPasswordResetTokenForUser(user,token);

        String body = "Hello, " + user.getFirstname() + "!\n\n"
                + "You requested for a password reset "
                + "Click the link down bellow to do it, or ignore this message if you did not requested this reset!\n\n"
                + url + ",\n\n"
                + "The Spring Boot Backend Team";


        emailService.sendEmail(user.getEmail(), "recuperation de votre mot passe", body );

        return new ResponseEntity<>("Verifiez votre boite mail pour renouveler votre mot de passe", HttpStatus.OK);
    }

    public void createPasswordResetTokenForUser(User user, String token){
        PasswordResetToken myToken = new PasswordResetToken(token, user);
    }
}
