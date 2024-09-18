package resumebuilder.back_end.api.model;

import java.util.ArrayList;

public class Resume {
    /*
     * Complete this model as you guys work on the endpoints.
     * I believe the best way for now would be to create a field that has a
     * type/model of a certain section. For example, education, work experience,
     * etc.
     * Also, changing these to interfaces might be good later.
     */
    private Education education;
    
    private ArrayList<Experience> experience;

    public Resume(ArrayList<Experience> experience) {
        this.experience = experience;
    }

    public ArrayList<Experience> getExperience() {
        return experience;
    }

    public void setExperience(ArrayList<Experience> experience) {
        this.experience = experience;
    }
}
