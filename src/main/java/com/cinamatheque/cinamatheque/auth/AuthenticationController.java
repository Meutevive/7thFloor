package com.cinamatheque.cinamatheque.auth;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final String password = "2Pk!$H!3^IfpC0k6S#w9H2Btx8FeQ0";
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody RegisterRequest request
    ) {
        if (request.getPassword().isBlank() && !request.getProvider().isBlank()){
             request.setPassword(password);
        }

        try { // On enregistre l'utilisateur
            return ResponseEntity.ok(
                    authenticationService.register(request)
            );
        } catch (DuplicateKeyException e){ // En cas de username deja utilisé
            return ResponseEntity.status(409).body(AuthenticationResponse.builder().message(e.getMessage()).build());
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticateRequest request
    ){
        if (request.getPassword().isBlank() && !request.getProvider().isBlank()){
            request.setPassword(password);
        }
        return ResponseEntity.ok(
                authenticationService.authenticate(request)
        );
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword (HttpServletRequest request,
                                                 @RequestParam("email") String email)
    {
        return authenticationService.forgotpassword(email);
    }

    @PostMapping("/newpassword")
    public ResponseEntity<String> newPassword(HttpServletRequest request,
                                              @RequestParam("password") String password,
                                              @RequestParam("token") String token)
    {

    }
}
