package resumebuilder.back_end.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.ResumeEntity;

@Component
public class ResumeMapper {

    private ModelMapper modelMapper;

    public ResumeMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ResumeDto mapToDto(ResumeEntity resumeEntity) {
        return modelMapper.map(resumeEntity, ResumeDto.class);
    }

    public ResumeEntity mapToEntity(ResumeDto resumeDto) {
        return modelMapper.map(resumeDto, ResumeEntity.class);
    }
}
