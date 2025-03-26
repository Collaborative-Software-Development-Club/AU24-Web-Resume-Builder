package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.Project;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto extends Project {
    private String id;
}
