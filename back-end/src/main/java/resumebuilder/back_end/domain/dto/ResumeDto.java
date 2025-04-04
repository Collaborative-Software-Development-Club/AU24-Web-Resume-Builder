package resumebuilder.back_end.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.*;
import resumebuilder.back_end.domain.model.enums.SectionNames;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
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

        this.id = id;
        this.userId = userId;
        if (name != null) {
            this.name = name;
        }
        if (contactMethods != null) {
            this.contactMethods = contactMethods;
        }
        if (education != null) {
            this.education = education;
        }
        if (experience != null) {
            this.experience = experience;
        }
        if (projects != null) {
            this.projects = projects;
        }
        if (professionalSummary != null) {
            this.professionalSummary = professionalSummary;
        }
        if (skills != null) {
            this.skills = skills;
        }
        if (orderOfSections != null) {
            this.orderOfSections = orderOfSections;
        }
        if (description != null && !description.isEmpty()) {
            this.description = description;
        }
        if (lastModified != null) {
            this.lastModified = lastModified;
        }
    }
}
