package resumebuilder.back_end.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import resumebuilder.back_end.domain.model.CustomDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "experience1")
public class ExperienceEntity {
    @Id
    private String id;
    private String userId;
    private String company;
    private String location;
    private String position;
    private CustomDate startDate;
    private CustomDate endDate;
    private String description;
}
