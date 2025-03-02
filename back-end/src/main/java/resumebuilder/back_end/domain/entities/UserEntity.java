package resumebuilder.back_end.domain.entities;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import resumebuilder.back_end.domain.model.enums.Role;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "users")
public class UserEntity {

    @NotBlank
    @Id
    private String id;
   
    private List<String> resumesId = new ArrayList<>();

    @NotBlank
    @Indexed(unique = true)
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private Role role;



    public void addResume(String resumeId) {
        this.resumesId.add(resumeId);
    }

    public void removeResume(String resumeId) {
        this.resumesId.remove(resumeId);
    }

}


// id
// resumes: list of resumes
// UserController (/users)
// GET
// POST
// UserService