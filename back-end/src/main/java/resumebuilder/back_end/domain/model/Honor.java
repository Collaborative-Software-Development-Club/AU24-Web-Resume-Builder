package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Honor extends VisibleElement {
    private String name;
    private String description;
    private CustomDate dateReceived;
}
