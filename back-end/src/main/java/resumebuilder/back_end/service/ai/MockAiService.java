package resumebuilder.back_end.service.ai;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/*
 * This is used as a placeholder for the text-enhancing service, 
 * so that the endpoints still work withthout making a call the 
 * actual LLM service or without having a local model installed.
 */
@Service
@Qualifier("Mock")
public class MockAiService implements AiService {

    public MockAiService() {
    }

    @Override
    public String enhanceResumeBulletPoints(String initialText) {
        return "Mock Ai Service: " + initialText;
    }

    @Override
    public Map<String, Object> scanResumeToJSON(String resume) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("content", "Mock Ai Service: " + resume);
        return map;
    }
}
