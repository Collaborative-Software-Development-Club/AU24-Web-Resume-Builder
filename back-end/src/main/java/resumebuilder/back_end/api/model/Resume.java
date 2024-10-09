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
    private EducationSection education;
    private ExperienceSection experience;
    private List<String> contactMethods;
    private List<String> skills;

    public Resume() {
        this.id = idCounter;
        this.contactMethods = new ArrayList<>();
        idCounter++;
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
    public EducationSection getEducation(){
        return this.education;
    }
    public void setEducation(EducationSection education) {
        this.education = education;
    }


    public void setExperience(ExperienceSection experience) {
        this.experience = experience;
    }

    public void addExperience(ExperienceItem newExperience) {
        experience.add(newExperience);
    }

    public Optional<ExperienceItem> removeExperience(int id) {
        return experience.remove(id);
    }
    public ExperienceSection getExperience(){
        return this.experience;
    }

    public Optional<ExperienceItem> getExperienceItem(int id) {
        return experience.get(id);
    }

    /*Skills*/
    public void setSkills(List<String> skills) {this.skills = skills;}

    public void addSkill(String newSkill) {skills.add(newSkill);}

    public List<String> getSkills() {return this.skills;}
}
