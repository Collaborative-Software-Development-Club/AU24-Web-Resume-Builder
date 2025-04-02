package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import resumebuilder.back_end.domain.model.enums.Role;

import java.util.ArrayList;
import java.util.List;
import resumebuilder.back_end.domain.model.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto extends User {
    private String id;
    private String username;

    private List<String> resumesId;
    private Role role;


    public void addResume(String resumeId) {
        this.resumesId.add(resumeId);
    }

    public void removeResume(String resumeId) {
        this.resumesId.remove(resumeId);
    }

}
