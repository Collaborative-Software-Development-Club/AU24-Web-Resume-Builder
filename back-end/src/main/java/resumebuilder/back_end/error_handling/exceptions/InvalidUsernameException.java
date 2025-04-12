package resumebuilder.back_end.error_handling.exceptions;

public class InvalidUsernameException extends RuntimeException {
    public InvalidUsernameException(String username) {
        super("User with username: " + username + " not found.");
    }
}
