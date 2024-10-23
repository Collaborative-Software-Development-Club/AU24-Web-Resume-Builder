package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.entities.UserEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

//    private List<UserEntity> users = new ArrayList<>();
//    private int nextId = 1;
//
//    public List<UserEntity> getAllUsers() {
//        return users;
//    }
//    public Optional<UserEntity> getUserById(int id) {
//        return users.stream().filter(user -> user.getId() == id).findFirst();
//    }
//
//    public UserEntity createUser() {
//        UserEntity newUser = new UserEntity(nextId++);
//        users.add(newUser);
//        return newUser;
//    }
//
//    public void addResumeToUser(int userId, int resumeId) {
//        getUserById(userId).ifPresent(user -> user.addResume(resumeId));
//    }
//
//    public void removeResumeFromUser(int userId, int resumeId) {
//        getUserById(userId).ifPresent(user -> user.removeResume(resumeId));
//    }

}
