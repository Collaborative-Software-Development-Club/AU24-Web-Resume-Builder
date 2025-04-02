package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.CustomDate;
import resumebuilder.back_end.domain.model.ExperienceItem;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceDto {
    private String userId;
    private String id;
    private String company;
    private String location;
    private String position;
    private CustomDate startDate;
    private CustomDate endDate;
    private String description;
}
