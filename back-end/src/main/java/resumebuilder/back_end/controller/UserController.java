package resumebuilder.back_end.controller;

import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.UserDto;
import resumebuilder.back_end.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        return userService.findOne(id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto newUser = userService.save(userDto);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/{userId}/resumes/{resumeId}")
    public ResponseEntity<UserDto> addResumeToUser(@PathVariable("userId") String userId, @PathVariable("resumeId") String resumeId) {
        Optional<UserDto> added = userService.addResumeToUser(userId, resumeId);
        if (added.isPresent()) {
            return new ResponseEntity<>(added.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}/resumes/{resumeId}")
    public ResponseEntity<UserDto> removeResumeFromUser(@PathVariable("userId") String userId, @PathVariable("resumeId") String resumeId) {
        Optional<UserDto> removed = userService.removeResumeFromUser(userId, resumeId);
        if (removed.isPresent()) {
            return new ResponseEntity<>(removed.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}