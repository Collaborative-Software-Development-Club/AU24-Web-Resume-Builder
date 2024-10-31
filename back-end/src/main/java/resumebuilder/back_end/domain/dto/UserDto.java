package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private String id;

    private List<String> resumesId;


    public void addResume(String resumeId) {
        this.resumesId.add(resumeId);
    }

    public void removeResume(String resumeId) {
        this.resumesId.remove(resumeId);
    }

}
