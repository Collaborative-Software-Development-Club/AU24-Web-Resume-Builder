package resumebuilder.back_end.service.ai;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface AiService {

    String enhanceResumeBulletPoints(String initialText);

    Map<String, Object> scanResumeToJSON(String resume) throws JsonProcessingException;
}
