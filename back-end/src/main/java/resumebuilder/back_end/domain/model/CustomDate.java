package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomDate {
    private Integer month = null;
    private Integer year = null;
}
