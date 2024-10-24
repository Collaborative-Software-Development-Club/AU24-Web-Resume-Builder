package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.Resume;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResumeDto extends Resume {

    private String id;

}
