package resumebuilder.back_end.controller;

import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

@Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable int id) {
        return userService.getUserById(id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<UserEntity> createUser() {
        UserEntity newUser = userService.createUser();
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/{userId}/resumes/{resumeId}")
    public ResponseEntity<Void> addResumeToUser(@PathVariable int userId, @PathVariable int resumeId) {
        userService.addResumeToUser(userId, resumeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/resumes/{resumeId}")
    public ResponseEntity<Void> removeResumeFromUser(@PathVariable int userId, @PathVariable int resumeId) {
        userService.removeResumeFromUser(userId, resumeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}