package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class EducationSection extends VisibleElement {
    private String institution;
    private String location;
    private String degree;
    private CustomDate graduation_date;
    private String specialization;
    private String minor;
    private double gpa;
    private List<Honor> honors;
}