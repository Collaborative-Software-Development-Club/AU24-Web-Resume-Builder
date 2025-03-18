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

//TODO unassign experiences/projects from a resume if they aren't present. Could be better to keep the list in resumeentity in the end

@Component
public class ResumeMapper2 {

    public ResumeMapper2() {
    }

    public ResumeDto mapToDto(ResumeEntity resumeEntity, List<ExperienceItem> experienceItems,
            List<Project> projects, UserEntity userEntity) {
        // TODO maybe userEntity shouldn't be passed here since experience/projects are
        // prepared for the DTO

        ResumeDto resumeDto = new ResumeDto();
        resumeDto.setId(resumeEntity.getId());
        resumeDto.setUserId(resumeEntity.getUserId());
        resumeDto.setName(userEntity.getName());
        resumeDto.setContactMethods(userEntity.getContactMethods());
        resumeDto.setOrderOfSections(resumeEntity.getOrderOfSections());
        resumeDto.setDescription(resumeEntity.getDescription());
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
        resumeEntity.setOrderOfSections(resumeDto.getOrderOfSections());
        resumeEntity.setDescription(resumeDto.getDescription());
        resumeEntity.setSkills(resumeDto.getSkills().getContent());
        resumeEntity.setProfessionalSummary(resumeDto.getProfessionalSummary().getContent());
        resumeEntity.setExperienceIds(experienceIds);
        resumeEntity.setProjectIds(projectIds);
        return resumeEntity;
    }

}
