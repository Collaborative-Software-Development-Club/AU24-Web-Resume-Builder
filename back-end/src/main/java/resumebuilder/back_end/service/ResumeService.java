package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.api.model.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ResumeService {

    private List<Resume> resumes;
    private int nextId = 1;

    public ResumeService() {
        resumes = new ArrayList<Resume>();
        Resume resume = this.createSampleResume();
        resumes.add(resume);
    }

    public Optional<Resume> partialUpdateResume(int resumeId, Resume updatedResume) {

        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                if (updatedResume.getExperiences() != null) {
                    resume.setExperiences(updatedResume.getExperiences());
                }
                if (updatedResume.getEducation() != null) {
                    resume.setEducation(updatedResume.getEducation());
                }
                return Optional.of(resume);
            }
        }
        return Optional.empty();
    }

    public Optional<Resume> getResume(int resumeId) {
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                return Optional.of(resume);
            }
        }
        return Optional.empty();
    }

    public Optional<Education> getEducation(int resumeId) {
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                return Optional.of(resume.getEducation());
            }
        }
        return Optional.empty();
    }

//    public void createEducation(int resumeId, Education education) throws Exception {
//        for (Resume resume : resumes) {
//            if (resume.getId() == resumeId) {
//                resume.addEducation(education);
//                return;
//            }
//        }
//        // TODO create a better exception or refactor the check if resume exists before calling this method
//        throw new Exception("Resume not found");
//    }

    public Optional<List<Experience>> getExperiences(int resumeId) {
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                return Optional.of(resume.getExperiences());
            }
        }
        return Optional.empty();
    }

    public Optional<Experience> getExperience(int resumeId, int experienceId) {
        Optional<Experience> optional = Optional.empty();
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                return resume.getExperience(experienceId);
            }
        }
        return optional;
    }

    public void createExperience(int resumeId, Experience experience) throws Exception {
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                resume.addExperience(experience);
                return;
            }
        }
        // TODO create a better exception or refactor the check if resume exists before calling this method
        throw new Exception("Resume not found");
    }

    public Optional<Experience> updateExperience(int resumeId, int experienceId, Experience updatedExperience) {
        Optional<Experience> experienceOptional = getExperience(resumeId, experienceId);
        if(experienceOptional.isPresent()){
            Experience experienceToUpdate = experienceOptional.get();
            experienceToUpdate.setCompany(updatedExperience.getCompany());
            experienceToUpdate.setLocation(updatedExperience.getLocation());
            experienceToUpdate.setPosition(updatedExperience.getPosition());
            experienceToUpdate.setStart_date(updatedExperience.getStart_date());
            experienceToUpdate.setEnd_date(updatedExperience.getEnd_date());
            experienceToUpdate.setDescription(updatedExperience.getDescription());
            experienceToUpdate.setVisible(updatedExperience.isVisible());
        }
        return experienceOptional;
    }

    public Experience partialUpdateExperience(int resumeId, int experienceId, Map<String, Object> updates) {
        Experience experienceToPatch = getExperience(resumeId, experienceId)
                .orElseThrow(() -> new IllegalArgumentException("Experience not found"));
        // Loop through the updates and apply them if the field exists
        updates.forEach((key, value) -> {
            switch (key) {
                case "company":
                    experienceToPatch.setCompany((String) value);
                    break;
                case "location":
                    experienceToPatch.setLocation((String) value);
                    break;
                case "position":
                    experienceToPatch.setPosition((String) value);
                    break;
                case "start_date":
                    Map<String, Integer> startDate = (Map<String, Integer>) value;
                    experienceToPatch.setStart_date(new CustomDate(startDate.get("month"), startDate.get("year")));
                    break;
                case "end_date":
                    if (value != null) {
                        Map<String, Integer> endDate = (Map<String, Integer>) value;
                        experienceToPatch.setEnd_date(new CustomDate(endDate.get("month"), endDate.get("year")));
                    } else {
                        experienceToPatch.setEnd_date(null);
                    }
                    break;
                case "description":
                    experienceToPatch.setDescription((String) value);
                    break;
                case "visible":
                    experienceToPatch.setVisible((Boolean) value);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid field: " + key);
            }
        });

        return experienceToPatch;
    }

    public Optional<Experience> deleteExperience(int resumeId, int experienceId) {
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                resume.removeExperience(experienceId);
            }
        }
        return Optional.empty();
    }

    public Optional<List<Project>> getProjects(int resumeId) {
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                return Optional.of(resume.getProjects());
            }
        }
        return Optional.empty();
    }

    public Optional<Project> getProject(int resumeId, int projectId) {
        Optional<Project> optional = Optional.empty();
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                return resume.getProject(projectId);
            }
        }
        return optional;
    }

    public void createProject(int resumeId, Project project) throws Exception {
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                resume.addProject(project);
                return;
            }
        }
        // TODO create a better exception or refactor the check if resume exists before calling this method
        throw new Exception("Resume not found");
    }

    public Optional<Project> updateProject(int resumeId, int projectId, Project updatedProject) {
        Optional<Project> projectOptional = getProject(resumeId, projectId);
        if(projectOptional.isPresent()){
            Project projectToUpdate = projectOptional.get();
            projectToUpdate.setTitle(updatedProject.getTitle());
            projectToUpdate.setOrganization(updatedProject.getOrganization());
            projectToUpdate.setLocation(updatedProject.getLocation());
            projectToUpdate.setStart_date(updatedProject.getStart_date());  // Assuming method names match
            projectToUpdate.setEnd_date(updatedProject.getEnd_date());      // Assuming method names match
            projectToUpdate.setDescription(updatedProject.getDescription());
            projectToUpdate.setVisible(updatedProject.isVisible());
        }
        return projectOptional;
    }

    public Project partialUpdateProject(int resumeId, int projectId, Map<String, Object> updates) {
        Project projectToPatch = getProject(resumeId, projectId)
                .orElseThrow(() -> new IllegalArgumentException("Experience not found"));
        // Loop through the updates and apply them if the field exists
        updates.forEach((key, value) -> {
            switch (key) {
                case "title":
                    projectToPatch.setTitle((String) value);
                    break;
                case "organization":
                    projectToPatch.setLocation((String) value);
                    break;
                case "location":
                    projectToPatch.setLocation((String) value);
                    break;
                case "start_date":
                    Map<String, Integer> startDate = (Map<String, Integer>) value;
                    projectToPatch.setStart_date(new CustomDate(startDate.get("month"), startDate.get("year")));
                    break;
                case "end_date":
                    if (value != null) {
                        Map<String, Integer> endDate = (Map<String, Integer>) value;
                        projectToPatch.setEnd_date(new CustomDate(endDate.get("month"), endDate.get("year")));
                    } else {
                        projectToPatch.setEnd_date(null);
                    }
                    break;
                case "description":
                    projectToPatch.setDescription((String) value);
                    break;
                case "visible":
                    projectToPatch.setVisible((Boolean) value);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid field: " + key);
            }
        });

        return projectToPatch;
    }

    public Optional<Project> deleteProject(int resumeId, int projectId) {
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                resume.removeProject(projectId);
            }
        }
        return Optional.empty();
    }

    private Resume createSampleResume() {
        List<Experience> experienceList = new ArrayList<Experience>();
        List<Honor> honorList = new ArrayList<>();
        List<Project> projectList = new ArrayList<>();
        honorList.add(new Honor("Fisher Pacesetter Award", "Given to the top one percent of students based on academic performance and demonstrated leadership ability"));
        honorList.add(new Honor("Honors Cohort Program", "One of 30 students selected to participate in the College of Business’ flagship two-year academic program"));

        Education education = new Education(
            "The Ohio State University",
		    "Columbus, Ohio",
		    "Bachelor of Science in Business Administration",
		    new GraduationDate(5, 2021),
		    "Finance",
		    "Business Analytics",
		    4.0,
            honorList
        );
        
        experienceList.add(new Experience(
                nextId++,
                "The Ohio State University",
                "Columbus, Ohio",
                "Resident Advisor",
                new CustomDate(8, 2018),
                null,
                "Ensured safety and served as a resource for 65+ residents\nFacilitated programs to foster the growth and development of undergraduate students\nAddressed and resolved issues to ensure a quality living experience for all residents in the residence hall",
                true));

        experienceList.add(new Experience(
                nextId++,
                "L Brands",
                "Columbus, Ohio",
                "Operations Management Intern",
                new CustomDate(5, 2019),
                new CustomDate(8, 2019),
                "Developed 40+ new standardized operating procedures to improve efficiency, productivity, and employee morale\nWorked with a team of 10 distribution managers to expand Bath and Body Works operations to a secondary campus",
                true));

        experienceList.add(new Experience(
                nextId++,
                "The Ohio State University Wexner Medical Center",
                "Columbus, Ohio",
                "Supply Chain Intern",
                new CustomDate(5, 2018),
                new CustomDate(8, 2018),
                "Collaborated with the purchasing department to develop metrics for tracking department performance\nResolved several hundred pricing discrepancies\nFormulated standard operating procedures for future interns",
                true));

        experienceList.add(new Experience(
                nextId++,
                "Buckeye Undergraduate Consulting Club",
                "Columbus, Ohio",
                "VP of Marketing and Communications",
                new CustomDate(1, 2017),
                null,
                "Conducted market research on blockchain technology feasibility for wire transactions\nDeveloped analytical skills through Power BI and Tableau workshops\nCompeted in three case competitions",
                false));

        experienceList.add(new Experience(
                nextId++,
                "Phi Chi Theta Professional Business Fraternity",
                "Columbus, Ohio",
                "Professional Development Chair",
                new CustomDate(2, 2018),
                null,
                "Created individualized professional development experiences for new members\nDeveloped and executed workshops to enrich pledges' understanding of brotherhood, professionalism, and philanthropy",
                false));

        experienceList.add(new Experience(
                nextId++,
                "Fisher Emerging Consultants",
                "Columbus, Ohio",
                "Member",
                new CustomDate(2, 2019),
                new CustomDate(4, 2019),
                "Participated in a consulting career readiness program focusing on problem solving, professionalism, and networking",
                false));

        projectList.add(new Project(
                nextId++,
                "Blockchain Feasibility Research",
                "Buckeye Undergraduate Consulting Club",
                "Columbus, Ohio",
                new CustomDate(1, 2018),
                new CustomDate(3, 2018),
                "Conducted in-depth research on the feasibility of incorporating blockchain technology for wire transactions for a local Columbus client.",
                true));

        Resume resume = new Resume();
        resume.setEducation(education);
        resume.setExperiences(experienceList);
        resume.setProjects(projectList);
        return resume;
    }
}
