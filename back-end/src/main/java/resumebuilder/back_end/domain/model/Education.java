package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Education {
    private String institution = "";
    private String location = "";
    private String degree = "";
    private CustomDate graduationDate = new CustomDate();
    private String specialization = "";
    private String minor = "";
    private double gpa;
    private List<Honor> honors = new ArrayList<>();
}
