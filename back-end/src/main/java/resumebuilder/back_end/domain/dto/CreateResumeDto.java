package resumebuilder.back_end.domain.dto;

import lombok.Data;

@Data
public class CreateResumeDto {
    private String userId;
    private String resumeId;
}
