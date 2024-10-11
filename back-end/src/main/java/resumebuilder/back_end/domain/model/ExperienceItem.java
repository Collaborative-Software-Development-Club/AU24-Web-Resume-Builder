package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ExperienceItem extends VisibleElement {
//    private static int idCounter = 0;
    private int id;
    private String company;
    private String location;
    private String position;
    private CustomDate start_date;
    private CustomDate end_date;
    private String description;
}
