package resumebuilder.back_end.domain.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}


// id
// resumes: list of resumes
// UserController (/users)
// GET
// POST
// UserService