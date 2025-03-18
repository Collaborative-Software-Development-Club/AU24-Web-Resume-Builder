package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Certification {
    private int id;
    private String certificationName;
    private String certifyingAgency;
    private CustomDate acquisitionDate;
}
