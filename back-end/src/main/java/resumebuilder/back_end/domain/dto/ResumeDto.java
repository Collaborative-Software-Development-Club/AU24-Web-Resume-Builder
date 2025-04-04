package resumebuilder.back_end.domain.dto;

import lombok.Data;
import resumebuilder.back_end.domain.model.*;
import resumebuilder.back_end.domain.model.enums.SectionNames;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.util.Assert;

@Data
public class ResumeDto {
    private String id;
    private String userId;

    private String name = "";
    private List<String> contactMethods = new ArrayList<>();
    private Section<Education> education = new Section<Education>(true, new Education());

    private Section<List<ExperienceItem>> experience = new Section<>(true, new ArrayList<>());
    private Section<List<Project>> projects = new Section<>(true, new ArrayList<>());

    private Section<String> professionalSummary = new Section<String>(false, "");
    private Section<Set<Skill>> skills = new Section<>(true, new HashSet<>());
    private List<SectionNames> orderOfSections = List.of(
            SectionNames.PROFESSIONAL_SUMMARY,
            SectionNames.EDUCATION,
            SectionNames.EXPERIENCE,
            SectionNames.PROJECTS,
            SectionNames.SKILLS,
            SectionNames.HONORS,
            SectionNames.CERTIFICATIONS,
            SectionNames.VOLUNTEER_EXPERIENCE);
    private String description = "Untitled";
    // can't have a default value
    private LocalDateTime lastModified = LocalDateTime.now();

    public ResumeDto(String id, String userId, String name, List<String> contactMethods, Section<Education> education,
            Section<List<ExperienceItem>> experience, Section<List<Project>> projects,
            Section<String> professionalSummary, Section<Set<Skill>> skills, List<SectionNames> orderOfSections,
            String description, LocalDateTime lastModified) {

        Assert.notNull(id, "id must not be null");
        this.id = id;

        Assert.notNull(userId, "userId must not be null");
        this.userId = userId;

        Assert.notNull(name, "name must not be null");
        this.name = name;

        Assert.notNull(contactMethods, "contactMethods must not be null");
        this.contactMethods = contactMethods;

        if (education != null) {
            this.education = education;
        }

        Assert.notNull(experience, "experience must not be null");
        this.experience = experience;

        Assert.notNull(projects, "projects must not be null");
        this.projects = projects;

        Assert.notNull(professionalSummary, "professionalSummary must not be null");
        this.professionalSummary = professionalSummary;

        Assert.notNull(skills, "skills must not be null");
        this.skills = skills;

        Assert.notNull(orderOfSections, "orderOfSections must not be null");
        this.orderOfSections = orderOfSections;

        Assert.notNull(description, "description must not be null");
        Assert.hasText(description, "description must not be empty");
        this.description = description;

        Assert.notNull(lastModified, "lastModified must not be null");
        this.lastModified = lastModified;
    }
}
