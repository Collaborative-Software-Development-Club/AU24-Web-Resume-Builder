package resumebuilder.back_end.error_handling.exceptions;

public class InvalidUserIDException extends RuntimeException {
    public InvalidUserIDException(String id) {super("User with ID: " + id + " not found.");}
}
