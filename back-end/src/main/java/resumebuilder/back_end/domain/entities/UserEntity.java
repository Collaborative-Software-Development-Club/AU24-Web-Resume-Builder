package resumebuilder.back_end.domain.entities;

import lombok.*;
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
   
    private List<String> resumesId;


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