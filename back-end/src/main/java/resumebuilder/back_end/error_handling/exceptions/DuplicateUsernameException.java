package resumebuilder.back_end.error_handling.exceptions;

public class DuplicateUsernameException extends RuntimeException {
    public DuplicateUsernameException(String username) {
        super("Username " + username + " is already taken");
    }
}
