package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.ExperienceItem;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceDto extends ExperienceItem {
    private String id;
}
