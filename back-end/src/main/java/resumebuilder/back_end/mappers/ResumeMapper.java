package resumebuilder.back_end.mappers;

import org.springframework.stereotype.Component;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.ResumeEntity;
import resumebuilder.back_end.domain.entities.UserEntity;
import resumebuilder.back_end.domain.model.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

//TODO unassign experiences/projects from a resume if they aren't present. Could be better to keep the list in resumeentity in the end

@Component
public class ResumeMapper {

    public ResumeMapper() {
    }

    public ResumeDto mapToDto(ResumeEntity resumeEntity, List<ExperienceItem> experienceItems,
            List<Project> projects, UserEntity userEntity) {
        // TODO maybe userEntity shouldn't be passed here since experience/projects are
        // prepared for the DTO

        ResumeDto resumeDto = new ResumeDto();
        resumeDto.setId(resumeEntity.getId());
        resumeDto.setUserId(resumeEntity.getUserId());
        resumeDto.setLastModified(resumeEntity.getLastModified());
        resumeDto.setDescription(resumeEntity.getDescription());
        // this is here for resumes that didn't yet have the lastModified field before
        if (resumeDto.getLastModified() == null) {
            resumeDto.setLastModified(LocalDateTime.now());
        }
        // this is for the resumes in the database that had an empty description instead
        // of untitled
        if (resumeDto.getDescription() == null || resumeDto.getDescription().isEmpty()) {
            resumeDto.setDescription("Untitled");
        }

        resumeDto.setName(userEntity.getName());
        resumeDto.setContactMethods(userEntity.getContactMethods());
        resumeDto.setOrderOfSections(resumeEntity.getOrderOfSections());
        Section<Education> educationSection = new Section<>(true, userEntity.getEducation());
        resumeDto.setEducation(educationSection);
        // System.out.println("experienceEntities");
        // System.out.println(experienceEntities);
        // System.out.println("experienceItems");
        // System.out.println(experienceItems);
        Section<List<ExperienceItem>> experienceSection = new Section<>(true, experienceItems);
        resumeDto.setExperience(experienceSection);
        // System.out.println("projectEntities");
        // System.out.println("projects");
        Section<List<Project>> projectSection = new Section<>(true, projects);
        resumeDto.setProjects(projectSection);
        Section<Set<Skill>> skills = new Section<>(true, resumeEntity.getSkills());
        resumeDto.setSkills(skills);
        Section<String> professionalSummary = new Section<>(true, resumeEntity.getProfessionalSummary());
        resumeDto.setProfessionalSummary(professionalSummary);

        return resumeDto;
    }

    public ResumeEntity mapToEntity(ResumeDto resumeDto, List<String> experienceIds, List<String> projectIds) {
        ResumeEntity resumeEntity = new ResumeEntity();
        // set fields from ResumeDto that map to ResumeEntity
        resumeEntity.setId(resumeDto.getId());
        resumeEntity.setUserId(resumeDto.getUserId());
        resumeEntity.setLastModified(resumeDto.getLastModified());
        resumeEntity.setOrderOfSections(resumeDto.getOrderOfSections());
        resumeEntity.setDescription(resumeDto.getDescription());
        resumeEntity.setSkills(resumeDto.getSkills().getContent());
        resumeEntity.setProfessionalSummary(resumeDto.getProfessionalSummary().getContent());
        resumeEntity.setExperienceIds(experienceIds);
        resumeEntity.setProjectIds(projectIds);
        return resumeEntity;
    }

}
