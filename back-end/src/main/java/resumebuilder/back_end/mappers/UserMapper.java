package resumebuilder.back_end.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.dto.UserDto;
import resumebuilder.back_end.domain.dto.UserRequestDto;
import resumebuilder.back_end.domain.entities.UserEntity;

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
        // TODO maybe this shouldn't be in the mapper?
        userEntity.setContactMethods(resumeDto.getContactMethods());
        userEntity.setEducation(resumeDto.getEducation().getContent());
        userEntity.setName(resumeDto.getName());

        // Looks sus; need to clarify functionality
        if (userEntity.getSkills() == null) {
            userEntity.setSkills(resumeDto.getSkills().getContent());
        } else {
            if (resumeDto.getSkills().getContent() == null) {
            } else {
                userEntity.getSkills().addAll(resumeDto.getSkills().getContent());
            }
        }
    }
}
