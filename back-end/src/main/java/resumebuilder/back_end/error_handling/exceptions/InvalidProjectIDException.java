package resumebuilder.back_end.error_handling.exceptions;

public class InvalidProjectIDException extends RuntimeException {
    public InvalidProjectIDException(String id) {super("Project with ID: " + id + " not found.");}
}
