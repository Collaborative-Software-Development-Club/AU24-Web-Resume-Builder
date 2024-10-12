package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomDate {
    private int month;
    private int year;
}
