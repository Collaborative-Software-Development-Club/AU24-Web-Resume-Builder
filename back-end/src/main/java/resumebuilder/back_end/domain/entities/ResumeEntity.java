package resumebuilder.back_end.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import resumebuilder.back_end.domain.model.Education;
import resumebuilder.back_end.domain.model.Experience;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class ResumeEntity {

    @Id
    private String id;

    private String name;
    private Education education;
    private List<Experience> experiences;
    private List<String> contactMethods;
    private List<String> skills;
}
