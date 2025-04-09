package resumebuilder.back_end.mappers;

import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.dto.UserDto;
import resumebuilder.back_end.domain.dto.UserRequestDto;
import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.domain.model.Skill;

@Component
public class UserMapper {

    private ModelMapper modelMapper;

    public UserMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public UserDto mapToDto(UserEntity userEntity) {
        return modelMapper.map(userEntity, UserDto.class);
    }

    public UserEntity mapToEntity(UserDto userDto) {
        return modelMapper.map(userDto, UserEntity.class);
    }

    public UserEntity toEntity(UserRequestDto dto) {
        UserEntity user = new UserEntity();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        return user;
    }

    public UserDto toResponseDto(UserEntity user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        return dto;
    }

    public void addResumeDtoContent(UserEntity userEntity, ResumeDto resumeDto) {
        // ? maybe this shouldn't be in the mapper?
        userEntity.setContactMethods(resumeDto.getContactMethods());
        userEntity.setEducation(resumeDto.getEducation().getContent());
        userEntity.setName(resumeDto.getName());

        Set<String> resumeSkillsAsStrings = resumeDto.getSkills().getContent();
        Set<Skill> skills = resumeSkillsAsStrings.stream().map(skillName -> new Skill(skillName))
                .collect(Collectors.toSet());
        if (userEntity.getSkills() == null) {
            userEntity.setSkills(skills);
        } else {
            if (resumeDto.getSkills().getContent() == null) {
            } else {
                userEntity.getSkills().addAll(skills);
            }
        }
    }
}
