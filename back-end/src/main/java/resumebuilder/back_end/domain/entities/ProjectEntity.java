package resumebuilder.back_end.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import resumebuilder.back_end.domain.model.Project;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class ProjectEntity extends Project {
    @Id
    private String id;
    private String userId;
}
