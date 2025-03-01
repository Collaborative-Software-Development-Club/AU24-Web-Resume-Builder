package resumebuilder.back_end.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.ExperienceEntity;
import resumebuilder.back_end.domain.entities.ProjectEntity;
import resumebuilder.back_end.domain.entities.ResumeEntity;
import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.domain.model.*;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ResumeMapper {

    private ModelMapper modelMapper;

    public ResumeMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ResumeDto mapToDto(ResumeEntity resumeEntity, List<ExperienceEntity> experienceEntities, List<ProjectEntity> projectEntities, UserEntity userEntity) {
        ResumeDto resumeDto = new ResumeDto();
        resumeDto.setId(resumeEntity.getId());
        resumeDto.setUserId(resumeEntity.getUserId());
        resumeDto.setName(userEntity.getName());
        resumeDto.setContactMethods(userEntity.getContactMethods());
        resumeDto.setOrderOfSections(resumeEntity.getOrderOfSections());
        resumeDto.setDescription(resumeEntity.getDescription());

        Section<Education> educationSection = new Section<Education>(true, userEntity.getEducation());
        Section<List<ExperienceItem>> experieneSection = new Section<List<ExperienceItem>>(true, mapToExperienceItemList(experienceEntities));
        Section<List<Project>> projectSection = new Section<List<Project>>(true, mapToProjectList(projectEntities));
        Section<List<Skill>> skills = new Section<List<Skill>>(true, resumeEntity.getSkills());
        Section<String> professionalSummary = new Section<String>(true, resumeEntity.getProfessionalSummary());

        resumeDto.setEducationSection(educationSection);
        resumeDto.setExperience(experieneSection);
        resumeDto.setProjects(projectSection);
        resumeDto.setSkills(skills);
        resumeDto.setProfessionalSummary(professionalSummary);

        return resumeDto;
    }

    public ResumeEntity mapToEntity(ResumeDto resumeDto) {
        return modelMapper.map(resumeDto, ResumeEntity.class);
    }

    private List<ExperienceItem> mapToExperienceItemList(List<ExperienceEntity> experienceEntities) {
        return experienceEntities.stream()
                .map(entity -> modelMapper.map(experienceEntities, ExperienceItem.class))
                .collect(Collectors.toList());
    }

    private List<Project> mapToProjectList(List<ProjectEntity> projectEntities) {
        return projectEntities.stream()
                .map(entity -> modelMapper.map(projectEntities, Project.class))
                .collect(Collectors.toList());
    }
}
