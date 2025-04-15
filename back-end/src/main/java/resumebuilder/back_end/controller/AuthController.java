package resumebuilder.back_end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import resumebuilder.back_end.domain.dto.AuthRequestDto;
import resumebuilder.back_end.domain.dto.AuthResponseDto;
import resumebuilder.back_end.domain.dto.UserDto;
import resumebuilder.back_end.domain.dto.UserRequestDto;
import resumebuilder.back_end.service.AuthService;
import resumebuilder.back_end.service.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/v1/auth")
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
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto request) {
        // TODO handle unsuccessful login
        String token = authService.authenticate(request);
        UserDto user = userService.findByUsername(request.getUsername());
        AuthResponseDto dto = new AuthResponseDto(token, user);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
