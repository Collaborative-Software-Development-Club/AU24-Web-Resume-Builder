package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.UserDto;
import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.mappers.UserMapper;
import resumebuilder.back_end.repository.UserRepository;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public boolean exists(String id) {
        return userRepository.existsById(id);
    }

    public UserDto save(UserDto userDto) {
        UserEntity userEntity = userMapper.mapToEntity(userDto);
        userRepository.save(userEntity);
        return userMapper.mapToDto(userEntity);
    }

    public List<UserDto> findAll() {
        List<UserEntity> users = new ArrayList<>(userRepository.findAll());
        return users.stream()
                .map(userMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public Optional<UserDto> findOne(String id) {
        Optional<UserEntity> user = userRepository.findById(id);
        return user.map(userMapper::mapToDto);
    }

    public boolean addResumeToUser(String userId, String resumeId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            userEntity.addResume(resumeId);
            return true;
        }
        return false;
    }

    public void removeResumeFromUser(String userId, String resumeId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            userEntity.removeResume(resumeId);
        }
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }

}
