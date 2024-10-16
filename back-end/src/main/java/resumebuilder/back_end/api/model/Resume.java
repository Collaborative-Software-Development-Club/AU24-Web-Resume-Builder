package resumebuilder.back_end.api.model;

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
    private Education education;
    private List<Experience> experiences;
    private List<Project> projects;


    public Resume() {
        this.id = idCounter;
        idCounter++;
    }

    public int getId() {
        return this.id;
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

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public void addProject(Project newProject) {
        projects.add(newProject);
    }

    public Optional<Project> removeProject(int id) {
        for (Project project : projects) {
            if (project.getId() == id) {
                projects.remove(project);
                return Optional.of(project);
            }
        }
        return Optional.empty();
    }

    public List<Project> getProjects(){
        return this.projects;
    }

    public Optional<Project> getProject(int id) {
        for (Project project : projects) {
            if (project.getId() == id) {
                return Optional.of(project);
            }
        }
        return Optional.empty();
    }

}
