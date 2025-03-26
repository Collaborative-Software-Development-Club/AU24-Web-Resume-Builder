package resumebuilder.back_end.service.ai;

public interface AiService {
   String enhanceResumeBulletPoints(String initialText);
   String scanResumeToJSON(String resume);
}
