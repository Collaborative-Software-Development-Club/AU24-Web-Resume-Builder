package resumebuilder.back_end.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.UserDto;
import resumebuilder.back_end.domain.dto.UserRequestDto;
import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.domain.model.enums.Role;
import resumebuilder.back_end.mappers.UserMapper;
import resumebuilder.back_end.repository.UserRepository;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
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

    public Optional<UserDto> addResumeToUser(String userId, String resumeId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            userEntity.addResume(resumeId);
            userRepository.save(userEntity);
            return Optional.ofNullable(userMapper.mapToDto(userEntity));
        }
        return Optional.empty();
    }

    public Optional<UserDto> removeResumeFromUser(String userId, String resumeId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            userEntity.removeResume(resumeId);
            userRepository.save(userEntity);
            return Optional.ofNullable(userMapper.mapToDto(userEntity));
        }
        return Optional.empty();
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }

    public UserDto registerUser(UserRequestDto requestDto) {
        UserEntity user = userMapper.toEntity(requestDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user = userRepository.save(user);
        return userMapper.toResponseDto(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }

}
