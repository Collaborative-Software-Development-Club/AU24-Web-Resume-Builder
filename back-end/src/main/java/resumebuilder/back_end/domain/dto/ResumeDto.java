package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.*;
import resumebuilder.back_end.domain.model.enums.SectionNames;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeDto {
    private String id;
    private String userId;
    private String name;
    private List<String> contactMethods;

    private Section<Education> education;
    private Section<List<ExperienceItem>> experience;
    private Section<List<Project>> projects;
    private Section<Set<Skill>> skills;
    private Section<String> professionalSummary;

    private List<SectionNames> orderOfSections = List.of(
            SectionNames.PROFESSIONAL_SUMMARY,
            SectionNames.EDUCATION,
            SectionNames.EXPERIENCE,
            SectionNames.PROJECTS,
            SectionNames.SKILLS,
            SectionNames.HONORS,
            SectionNames.CERTIFICATIONS,
            SectionNames.VOLUNTEER_EXPERIENCE
    );
    private String description;
}
