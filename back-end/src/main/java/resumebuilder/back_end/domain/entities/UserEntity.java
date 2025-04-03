package resumebuilder.back_end.domain.entities;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import resumebuilder.back_end.domain.model.enums.Role;
import resumebuilder.back_end.domain.model.Education;
import resumebuilder.back_end.domain.model.Skill;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user1")
public class UserEntity {

    @NotBlank
    @Id
    private String id;

    @NotBlank
    @Indexed(unique = true)
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private Role role;

    private String name;
    private Education education;
    private List<String> contactMethods;
    private Set<Skill> skills;
}