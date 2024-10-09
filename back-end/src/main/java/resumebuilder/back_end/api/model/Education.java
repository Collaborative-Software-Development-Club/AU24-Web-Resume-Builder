package resumebuilder.back_end.api.model;
import java.util.List;

public class Education extends VisibleElement {

public class Education extends Section {
    private String institution;
    private String location;
    private String degree;
    private GraduationDate graduation_date;
    private String specialization;
    private String minor;
    private double gpa;
    private List<Honor> honors;

    public Education(String institution, String location, String degree, GraduationDate graduation_date, String specialization, String minor, double gpa, List<Honor> honors) {
        this.institution = institution;
        this.location = location;
        this.degree = degree;
        this.graduation_date = graduation_date;
        this.specialization = specialization;
        this.minor = minor;
        this.gpa = gpa;
        this.honors = honors;
    }
    public String getInstitution() {
        return institution;
    }
    public void setInstitution(String institution) {
        this.institution = institution;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getDegree() {
        return degree;
    }
    public void setDegree(String degree) {
        this.degree = degree;
    }
    public GraduationDate getGraduation_date() {
        return graduation_date;
    }
    public void setGraduation_date(GraduationDate graduation_date) {
        this.graduation_date = graduation_date;
    }
    public String getSpecialization() {
        return specialization;
    }
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    public String getMinor() {
        return minor;
    }
    public void setMinor(String minor) {
        this.minor = minor;
    }
    public double getGpa() {
        return gpa;
    }
    public void setGpa(double gpa) {
        this.gpa = gpa;
    }
    public List<Honor> getHonors() {
        return honors;
    }
}

