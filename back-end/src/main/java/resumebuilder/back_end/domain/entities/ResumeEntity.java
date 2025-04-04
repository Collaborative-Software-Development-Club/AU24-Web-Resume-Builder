package resumebuilder.back_end.domain.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.Assert;

import com.mongodb.lang.NonNull;

import resumebuilder.back_end.domain.model.*;
import resumebuilder.back_end.domain.model.enums.SectionNames;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Document(collection = "resume1")
@NoArgsConstructor
public class ResumeEntity {
    @Id
    @NonNull
    private String id;
    @NonNull
    private String userId;
    @NonNull
    private List<String> experienceIds = List.of();
    @NonNull
    private List<String> projectIds = List.of();

    @NonNull
    private Set<Skill> skills = Set.of();
    private String professionalSummary = "";
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

    public ResumeEntity(String userId) {
        this.userId = userId;
    }

    public ResumeEntity(String id, String userId, List<String> experienceIds, List<String> projectIds,
            Set<Skill> skills, String professionalSummary, List<SectionNames> orderOfSections, String description,
            LocalDateTime lastModified) {

        // id can be null because it has to be assigned by the database
        this.id = id;

        Assert.notNull(userId, "userId must not be null");
        this.userId = userId;

        Assert.notNull(experienceIds, "experienceIds must not be null");
        this.experienceIds = experienceIds;

        Assert.notNull(projectIds, "projectIds must not be null");
        this.projectIds = projectIds;

        Assert.notNull(skills, "skills must not be null");
        this.skills = skills;

        Assert.notNull(professionalSummary, "professionalSummary must not be null");
        this.professionalSummary = professionalSummary;

        Assert.notNull(orderOfSections, "orderOfSections must not be null");
        this.orderOfSections = orderOfSections;

        Assert.notNull(description, "description must not be null");
        this.description = description;

        Assert.notNull(lastModified, "lastModified must not be null");
        this.lastModified = lastModified;
    }
}
