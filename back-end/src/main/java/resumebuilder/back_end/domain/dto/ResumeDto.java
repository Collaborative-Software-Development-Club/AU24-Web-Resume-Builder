package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.Resume;
import resumebuilder.back_end.domain.model.EducationSection;
import resumebuilder.back_end.domain.model.ExperienceSection;
import resumebuilder.back_end.domain.model.enums.SectionNames;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResumeDto extends Resume {

    private String id;

    private List<SectionNames> orderOfSections = List.of(SectionNames.EDUCATION, SectionNames.EXPERIENCES, SectionNames.PROJECTS, SectionNames.SKILLS);

}
