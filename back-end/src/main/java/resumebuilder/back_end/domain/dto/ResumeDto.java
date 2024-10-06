package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.Education;
import resumebuilder.back_end.domain.model.Experience;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResumeDto {

    private String id;

    private String name;
    private Education education;
    private List<Experience> experiences;
    private List<String> contactMethods;
    private List<String> skills;
}
