package resumebuilder.back_end.error_handling.exceptions;

public class ResumeNotFoundException extends RuntimeException{
    public ResumeNotFoundException(String id) {
        super("Resume with ID " + id + " not found.");
    }
}
