package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.Resume;
import resumebuilder.back_end.domain.model.enums.SectionNames;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeDto extends Resume {

    private String id;


}
