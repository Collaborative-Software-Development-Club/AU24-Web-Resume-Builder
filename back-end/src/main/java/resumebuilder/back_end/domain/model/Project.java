package resumebuilder.back_end.domain.model;

import lombok.Data;

@Data
public class Project {
    private static int idCounter = 0;
    private int id;
    private String title;
    private String organization;
    private String location;
    private CustomDate startDate;
    private CustomDate endDate;
    private String description;
    private boolean visible;

    public Project(){
        idCounter++;
        this.id = idCounter;
    }
    public Project(String title, String organization, String location, CustomDate startDate, CustomDate endDate, String description, boolean visible) {
        this.id = idCounter;
        this.title = title;
        this.organization = organization;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.visible = visible;
        this.id = idCounter;
    }

}