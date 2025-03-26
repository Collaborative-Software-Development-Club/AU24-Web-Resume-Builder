package resumebuilder.back_end.service.ai;
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
    public String scanResumeToJSON(String resume) { return "Mock Ai Service: " + resume; }
}
