package resumebuilder.back_end.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import resumebuilder.back_end.domain.dto.UserDto;
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

}
