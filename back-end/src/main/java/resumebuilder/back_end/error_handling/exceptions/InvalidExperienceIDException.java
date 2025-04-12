package resumebuilder.back_end.error_handling.exceptions;

public class InvalidExperienceIDException extends RuntimeException {
    public InvalidExperienceIDException(String id) {
        super("Project with ID: " + id + " not found.");
    }
}
