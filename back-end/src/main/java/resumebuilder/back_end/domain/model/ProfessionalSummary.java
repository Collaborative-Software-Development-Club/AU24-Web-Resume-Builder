package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProfessionalSummary extends VisibleElement {
    private String summary;
}
