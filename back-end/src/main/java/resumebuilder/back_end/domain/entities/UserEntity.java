package resumebuilder.back_end.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class UserEntity {

    @Id
    private String id;
   
    private List<Integer> resumesId;


    public void addResume(Integer resumeId) {
        this.resumesId.add(resumeId);
    }

    public void removeResume(Integer resumeId) {
        this.resumesId.remove(resumeId);
    }
}


// id
// resumes: list of resumes
// UserController (/users)
// GET
// POST
// UserService