package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    private String id;
    private String title;
    private String organization;
    private String location;
    private CustomDate startDate;
    private CustomDate endDate;
    private String description;
}