package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Section<T> {
    private boolean visible;
    private T content;
}
