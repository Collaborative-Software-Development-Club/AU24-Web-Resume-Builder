package resumebuilder.back_end.api.model;

public class Experience {
    private static int idCounter = 0;
    private int id;
    private String company;
    private String location;
    private String position;
    private CustomDate start_date;
    private CustomDate end_date;
    private String description;
    private boolean visible;

    public Experience(int id, String company, String location, String position, CustomDate start_date, CustomDate end_date, String description, boolean visible) {
        this.id = id;
        this.company = company;
        this.location = location;
        this.position = position;
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
    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
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
