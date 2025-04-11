package resumebuilder.back_end.error_handling;

import java.time.LocalDateTime;

public class ErrorResponse {
    final private String message;
    final private String details;
    final private int statusCode;
    final private LocalDateTime dateTime;

    public ErrorResponse(String message, String details, int statusCode, LocalDateTime dateTime) {
        this.message = message;
        this.details = details;
        this.statusCode = statusCode;
        this.dateTime = dateTime;
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
    public LocalDateTime getDateTime() {return dateTime;}
}
