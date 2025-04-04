package resumebuilder.back_end.mappers;

import org.springframework.stereotype.Component;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.ResumeEntity;
import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.domain.model.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Component
public class ResumeMapper {

    public ResumeMapper() {
    }

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
        Section<Set<Skill>> skills = new Section<>(true, resumeEntity.getSkills());
        Section<String> professionalSummary = new Section<>(true, resumeEntity.getProfessionalSummary());

        ResumeDto resumeDto = new ResumeDto(resumeEntity.getId(), resumeEntity.getUserId(), userEntity.getName(),
                userEntity.getContactMethods(), educationSection, experienceSection, projectSection,
                professionalSummary, skills, resumeEntity.getOrderOfSections(),
                resumeEntity.getDescription().isBlank() ? "Untitled" : resumeEntity.getDescription(),
                resumeEntity.getLastModified());

        return resumeDto;
    }

    public ResumeEntity mapToEntity(ResumeDto resumeDto, List<String> experienceIds, List<String> projectIds) {
        ResumeEntity resumeEntity = new ResumeEntity();
        // set fields from ResumeDto that map to ResumeEntity
        resumeEntity.setId(resumeDto.getId());
        resumeEntity.setUserId(resumeDto.getUserId());
        resumeEntity.setLastModified(resumeDto.getLastModified());
        resumeEntity.setOrderOfSections(resumeDto.getOrderOfSections());
        resumeEntity.setDescription(
                resumeDto.getDescription().isEmpty() ? "Untitled" : resumeDto.getDescription());
        resumeEntity.setSkills(resumeDto.getSkills().getContent());
        resumeEntity.setProfessionalSummary(resumeDto.getProfessionalSummary().getContent());
        resumeEntity.setExperienceIds(experienceIds);
        resumeEntity.setProjectIds(projectIds);
        return resumeEntity;
    }

}
