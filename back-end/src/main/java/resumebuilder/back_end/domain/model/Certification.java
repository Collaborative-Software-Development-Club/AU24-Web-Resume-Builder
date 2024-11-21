package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Certification extends VisibleElement {
    private int id;
    private String certificationName;
    private String certifyingAgency;
    private CustomDate acquisitionDate;
}
