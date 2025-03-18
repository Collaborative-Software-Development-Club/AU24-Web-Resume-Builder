package resumebuilder.back_end.domain.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import resumebuilder.back_end.domain.model.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class UserEntity extends User {
    @Id
    private String id;
}