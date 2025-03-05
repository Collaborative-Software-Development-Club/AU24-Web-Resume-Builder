package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.*;
import resumebuilder.back_end.domain.model.enums.SectionNames;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeDto {
    private String id;
    private String userId;
    private String name = "";
    private List<String> contactMethods = new ArrayList<>();

    private Section<Education> education = new Section<Education>(true, new Education());
    private Section<List<ExperienceItem>> experience = new Section<>(true, new ArrayList<>());
    private Section<List<Project>> projects = new Section<>(true, new ArrayList<>());
    private Section<Set<Skill>> skills = new Section<>(true, new HashSet<>());
    private Section<String> professionalSummary = new Section<String>(false, "");

    private List<SectionNames> orderOfSections = List.of(
            SectionNames.PROFESSIONAL_SUMMARY,
            SectionNames.EDUCATION,
            SectionNames.EXPERIENCE,
            SectionNames.PROJECTS,
            SectionNames.SKILLS,
            SectionNames.HONORS,
            SectionNames.CERTIFICATIONS,
            SectionNames.VOLUNTEER_EXPERIENCE
    );
    private String description = "";
}
