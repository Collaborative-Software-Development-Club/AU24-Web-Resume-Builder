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
import java.util.Set;
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

        Section<Education> educationSection = new Section<>(true, userEntity.getEducation());
        resumeDto.setEducation(educationSection);
        Section<List<ExperienceItem>> experieneSection = new Section<>(true, mapToExperienceItemList(experienceEntities));
        resumeDto.setExperience(experieneSection);
        Section<List<Project>> projectSection = new Section<>(true, mapToProjectList(projectEntities));
        resumeDto.setProjects(projectSection);
        Section<Set<Skill>> skills = new Section<>(true, resumeEntity.getSkills());
        resumeDto.setSkills(skills);
        Section<String> professionalSummary = new Section<>(true, resumeEntity.getProfessionalSummary());
        resumeDto.setProfessionalSummary(professionalSummary);

        return resumeDto;
    }

    public ResumeEntity mapToEntity(ResumeDto resumeDto, List<ExperienceEntity> experienceEntities, List<ProjectEntity> projectEntities, UserEntity userEntity) {
        ResumeEntity resumeEntity = new ResumeEntity();
        // set fields from ResumeDto that map to ResumeEntity
        resumeEntity.setId(resumeDto.getId());
        resumeEntity.setUserId(resumeDto.getUserId());
        resumeEntity.setOrderOfSections(resumeDto.getOrderOfSections());
        resumeEntity.setDescription(resumeDto.getDescription());
        resumeEntity.setSkills(resumeDto.getSkills().getContent());
        resumeEntity.setProfessionalSummary(resumeDto.getProfessionalSummary().getContent());
        // set fields form ResumeDto that map to UserEntity
        userEntity.setContactMethods(resumeDto.getContactMethods());
        userEntity.setEducation(resumeDto.getEducation().getContent());
        userEntity.setName(resumeDto.getName());
        userEntity.getSkills().addAll(resumeDto.getSkills().getContent());
        // create experience entities
        experienceEntities.addAll(resumeDto.getExperience().getContent().stream()
                .map(experienceItem -> modelMapper.map(experienceItem, ExperienceEntity.class))
                .collect(Collectors.toList()));
        // create project entities
        projectEntities.addAll(resumeDto.getProjects().getContent().stream()
                .map(project -> modelMapper.map(project, ProjectEntity.class))
                .collect(Collectors.toList()));
        return resumeEntity;
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
