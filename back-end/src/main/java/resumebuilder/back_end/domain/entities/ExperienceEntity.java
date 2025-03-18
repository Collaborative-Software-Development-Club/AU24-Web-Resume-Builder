package resumebuilder.back_end.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import resumebuilder.back_end.domain.model.ExperienceItem;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "experience1")
public class ExperienceEntity extends ExperienceItem {
    @Id
    private String id;
    String userId;
}
