package resumebuilder.back_end.domain.model;

public class Project {
    private static int idCounter = 0;
    private int id;
    private String title;
    private String organization;
    private String location;
    private CustomDate start_date;
    private CustomDate end_date;
    private String description;
    private boolean visible;

    public Project(int id, String title, String organization, String location, CustomDate start_date, CustomDate end_date, String description, boolean visible) {
        this.id = id;
        this.title = title;
        this.organization = organization;
        this.location = location;
        this.start_date = start_date;
        this.end_date = end_date;
        this.description = description;
        this.visible = visible;
        this.id = idCounter;
        idCounter++;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public CustomDate getStart_date() {
        return start_date;
    }

    public void setStart_date(CustomDate start_date) {
        this.start_date = start_date;
    }

    public CustomDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(CustomDate end_date) {
        this.end_date = end_date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }
}