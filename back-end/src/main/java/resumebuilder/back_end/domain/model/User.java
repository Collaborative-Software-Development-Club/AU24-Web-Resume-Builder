package resumebuilder.back_end.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String name;
    private Education education;
    private List<String> contactMethods;
    private Set<Skill> skills;
}
