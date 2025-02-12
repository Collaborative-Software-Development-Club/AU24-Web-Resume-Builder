package resumebuilder.back_end.domain.model;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.enums.SectionNames;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Resume {
    private String name;
    private EducationSection education;
    private VisibleSectionOfItems<ExperienceItem> experience;
    private VisibleSectionOfItems<Project> projects;
    private List<String> contactMethods;
    private VisibleSectionOfItems<Skill> skills;
    private VisibleSectionOfItems<ExperienceItem> volunteerExperience;
    private VisibleSectionOfItems<Certification> certifications;
    private VisibleSectionOfItems<Honor> honors;
    private ProfessionalSummary professionalSummary;
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
