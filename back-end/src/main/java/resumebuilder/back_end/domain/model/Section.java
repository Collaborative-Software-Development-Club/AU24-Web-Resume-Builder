package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Section<T> {
    private boolean visible;
    private T content;
}
