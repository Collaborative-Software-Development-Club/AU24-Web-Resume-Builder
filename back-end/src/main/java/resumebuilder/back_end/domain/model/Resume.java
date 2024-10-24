package resumebuilder.back_end.domain.model;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
