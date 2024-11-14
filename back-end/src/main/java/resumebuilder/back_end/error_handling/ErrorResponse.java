package resumebuilder.back_end.error_handling;

public class ErrorResponse {
    final private String message;
    final private String details;
    final private int statusCode;

    public ErrorResponse(String message, String details, int statusCode) {
        this.message = message;
        this.details = details;
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
