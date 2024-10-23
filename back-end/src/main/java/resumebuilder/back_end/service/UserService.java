package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.entities.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private List<User> users = new ArrayList<>();
    private int nextId = 1;

    public List<User> getAllUsers() {
        return users;
    }
    public Optional<User> getUserById(int id) {
        return users.stream().filter(user -> user.getId() == id).findFirst();
    }

    public User createUser() {
        User newUser = new User(nextId++);
        users.add(newUser);
        return newUser;
    }

    public void addResumeToUser(int userId, int resumeId) {
        getUserById(userId).ifPresent(user -> user.addResume(resumeId));
    }

    public void removeResumeFromUser(int userId, int resumeId) {
        getUserById(userId).ifPresent(user -> user.removeResume(resumeId));
    }

}
