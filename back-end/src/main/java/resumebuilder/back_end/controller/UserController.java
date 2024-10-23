package resumebuilder.back_end.controller;

import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.UserDto;
import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.List;

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
    public ResponseEntity<Void> addResumeToUser(@PathVariable("id") String userId, @PathVariable String resumeId) {
        boolean added = userService.addResumeToUser(userId, resumeId);
        if (added) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}/resumes/{resumeId}")
    public ResponseEntity<Void> removeResumeFromUser(@PathVariable("id") String userId, @PathVariable String resumeId) {
        userService.removeResumeFromUser(userId, resumeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}