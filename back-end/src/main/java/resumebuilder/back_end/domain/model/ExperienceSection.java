package resumebuilder.back_end.domain.model;


import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor

public class ExperienceSection extends VisibleElement {
    private List<ExperienceItem> items;
}
