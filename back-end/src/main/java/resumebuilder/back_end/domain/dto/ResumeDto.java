package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.EducationSection;
import resumebuilder.back_end.domain.model.ExperienceSection;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResumeDto {

    private String id;

    private String name;
    private EducationSection education;
    private ExperienceSection experiences;
    private List<String> contactMethods;
    private List<String> skills;
}
