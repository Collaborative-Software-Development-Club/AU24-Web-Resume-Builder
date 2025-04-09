package resumebuilder.back_end.mappers;

import org.springframework.stereotype.Component;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.ResumeEntity;
import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.domain.model.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ResumeMapper {

    public ResumeMapper() {
    }

    // in this class, we use the all args constructors so that we con't forget to
    // set any fields

    public ResumeDto mapToDto(ResumeEntity resumeEntity, List<ExperienceItem> experienceItems,
            List<Project> projects, UserEntity userEntity) {
        // ? maybe userEntity shouldn't be passed here since experience/projects are
        // prepared for the DTO

        Section<Education> educationSection = new Section<>(true,
                userEntity.getEducation() != null ? userEntity.getEducation() : new Education());
        // System.out.println("experienceEntities");
        // System.out.println(experienceEntities);
        // System.out.println("experienceItems");
        // System.out.println(experienceItems);
        Section<List<ExperienceItem>> experienceSection = new Section<>(true, experienceItems);
        // System.out.println("projectEntities");
        // System.out.println("projects");
        Section<List<Project>> projectSection = new Section<>(true, projects);
        Section<Set<String>> skills = new Section<Set<String>>(true,
                resumeEntity.getSkills().stream().map(skill -> skill.getSkillName()).collect(Collectors.toSet()));
        Section<String> professionalSummary = new Section<>(true, resumeEntity.getProfessionalSummary());

        ResumeDto resumeDto = new ResumeDto(resumeEntity.getId(), resumeEntity.getUserId(), userEntity.getName(),
                userEntity.getContactMethods(), educationSection, experienceSection, projectSection,
                professionalSummary, skills, resumeEntity.getOrderOfSections(),
                resumeEntity.getDescription().isBlank() ? "Untitled" : resumeEntity.getDescription(),
                resumeEntity.getLastModified());

        return resumeDto;
    }

    public ResumeEntity mapToEntity(ResumeDto resumeDto, List<String> experienceIds, List<String> projectIds) {
        return new ResumeEntity(
                resumeDto.getId(),
                resumeDto.getUserId(),
                experienceIds,
                projectIds,
                resumeDto.getSkills().getContent().stream().map(skillName -> new Skill(skillName))
                        .collect(Collectors.toSet()),
                resumeDto.getProfessionalSummary().getContent(),
                resumeDto.getOrderOfSections(),
                resumeDto.getDescription().isEmpty() ? "Untitled" : resumeDto.getDescription(),
                resumeDto.getLastModified());
    }

}
