package resumebuilder.back_end.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import resumebuilder.back_end.domain.model.EducationSection;
import resumebuilder.back_end.domain.model.ExperienceSection;
import resumebuilder.back_end.domain.model.ProjectSection;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class ResumeEntity {

    @Id
    private String id;

    private String name;
    private EducationSection education;
    private ExperienceSection experiences;
    private ProjectSection projects;
    private List<String> contactMethods;
    private List<String> skills;
}
