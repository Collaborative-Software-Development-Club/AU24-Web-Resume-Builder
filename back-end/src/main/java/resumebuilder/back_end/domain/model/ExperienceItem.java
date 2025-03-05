package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceItem {
    private String id;
    private String company;
    private String location;
    private String position;
    private CustomDate startDate;
    private CustomDate endDate;
    private String description;
}
