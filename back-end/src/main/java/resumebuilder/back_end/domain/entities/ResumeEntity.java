package resumebuilder.back_end.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import resumebuilder.back_end.domain.model.*;
import resumebuilder.back_end.domain.model.enums.SectionNames;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "resume1")
public class ResumeEntity {
    @Id
    @NonNull
    private String id;
    @NonNull
    private String userId;
    @NonNull
    private List<String> experienceIds;
    @NonNull
    private List<String> projectIds;

    @NonNull
    private Set<Skill> skills;
    private String professionalSummary;
    @NonNull
    private List<SectionNames> orderOfSections = List.of(
            SectionNames.PROFESSIONAL_SUMMARY,
            SectionNames.EDUCATION,
            SectionNames.EXPERIENCE,
            SectionNames.PROJECTS,
            SectionNames.SKILLS,
            SectionNames.HONORS,
            SectionNames.CERTIFICATIONS,
            SectionNames.VOLUNTEER_EXPERIENCE);
    @NonNull
    private String description = "Untitled";
    private LocalDateTime lastModified = LocalDateTime.now();
}
