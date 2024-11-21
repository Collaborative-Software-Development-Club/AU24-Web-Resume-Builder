package resumebuilder.back_end.error_handling.exceptions;

public class InvalidResumeDataException extends RuntimeException{
    public InvalidResumeDataException(String message) {
        super(message);
    }
}
