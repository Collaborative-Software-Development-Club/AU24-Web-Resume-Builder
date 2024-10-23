package resumebuilder.back_end.api.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Resume {
    /*
     * Complete this model as you guys work on the endpoints.
     * I believe the best way for now would be to create a field that has a
     * type/model of a certain section. For example, education, work experience,
     * etc.
     * Also, changing these to interfaces might be good later.
     */
    private static int idCounter = 0;

    private int id;
    private String name;
    private Education education;
    private List<Experience> experiences;
    private List<String> contactMethods;
    private List<String> skills;
    private Integer userId;

    public Resume() {
        this.id = idCounter;
        this.contactMethods = new ArrayList<>();
        idCounter++;
    }
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    
    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String newName){
        this.name = newName;
    }

    public void setContactMethods(List<String> contactMethods) {
        this.contactMethods = contactMethods;
    }

    public List<String> getContactMethods() {
        return this.contactMethods;
    }
    public Education getEducation(){
        return this.education;
    }
    public void setEducation(Education education) {
        this.education = education;
    }


    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }

    public void addExperience(Experience newExperience) {
        experiences.add(newExperience);
    }

    public Optional<Experience> removeExperience(int id) {
        for (Experience experience : experiences) {
            if (experience.getId() == id) {
                experiences.remove(experience);
                return Optional.of(experience);
            }
        }
        return Optional.empty();
    }
    public List<Experience> getExperiences(){
        return this.experiences;
    }

    public Optional<Experience> getExperience(int id) {
        for (Experience experience : experiences) {
            if (experience.getId() == id) {
                return Optional.of(experience);
            }
        }
        return Optional.empty();
    }

    /*Skills*/
    public void setSkills(List<String> skills) {this.skills = skills;}

    public void addSkill(String newSkill) {skills.add(newSkill);}

    public List<String> getSkills() {return this.skills;}
}

