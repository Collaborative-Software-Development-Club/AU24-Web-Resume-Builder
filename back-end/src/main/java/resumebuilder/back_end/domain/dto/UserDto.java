package resumebuilder.back_end.domain.dto;

import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.enums.Role;
import resumebuilder.back_end.domain.model.Education;
import resumebuilder.back_end.domain.model.Skill;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String id;
    private String username;
    private Role role;

    private String name;
    private Education education;
    private List<String> contactMethods;
    private Set<Skill> skills;
}
