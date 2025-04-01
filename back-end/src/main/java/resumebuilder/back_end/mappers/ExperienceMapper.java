package resumebuilder.back_end.mappers;

import java.util.List;

import resumebuilder.back_end.domain.entities.ExperienceEntity;
import resumebuilder.back_end.domain.model.ExperienceItem;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ExperienceMapper {
    private ModelMapper modelMapper;

    public ExperienceMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public List<ExperienceEntity> mapToEntity(List<ExperienceItem> experiencesFromDto) {
        List<ExperienceEntity> entities = experiencesFromDto.stream()
                .map(experience -> modelMapper.map(experience, ExperienceEntity.class)).collect(Collectors.toList());
        return entities;
    }

    public List<ExperienceItem> mapToExperienceItem(List<ExperienceEntity> experienceEntities) {
        return experienceEntities.stream()
                .map(entity -> new ExperienceItem(entity.getId(), entity.getCompany(), entity.getLocation(),
                        entity.getPosition(), entity.getStartDate(), entity.getEndDate(), entity.getDescription()))
                .collect(Collectors.toList());
    }
}
