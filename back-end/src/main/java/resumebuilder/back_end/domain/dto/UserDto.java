package resumebuilder.back_end.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private String id;

    private List<Integer> resumesId;


    public void addResume(Integer resumeId) {
        this.resumesId.add(resumeId);
    }

    public void removeResume(Integer resumeId) {
        this.resumesId.remove(resumeId);
    }

}
