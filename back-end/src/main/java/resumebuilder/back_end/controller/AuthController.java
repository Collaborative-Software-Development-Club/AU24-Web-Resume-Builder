package resumebuilder.back_end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import resumebuilder.back_end.domain.dto.AuthRequestDto;
import resumebuilder.back_end.domain.dto.UserRequestDto;
import resumebuilder.back_end.service.AuthService;
import resumebuilder.back_end.service.UserService;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequestDto requestDto) {
        try {
            userService.registerUser(requestDto);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDto request) {
        String token = authService.authenticate(request);
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}
