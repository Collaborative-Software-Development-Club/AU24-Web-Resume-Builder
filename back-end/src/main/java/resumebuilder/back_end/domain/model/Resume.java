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
    private List<SectionNames> orderOfSections = List.of(SectionNames.EDUCATION, SectionNames.EXPERIENCES, SectionNames.PROJECTS, SectionNames.SKILLS);
}
