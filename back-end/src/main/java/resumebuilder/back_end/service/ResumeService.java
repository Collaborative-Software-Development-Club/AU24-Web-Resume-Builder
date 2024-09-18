package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.api.model.CustomDate;
import resumebuilder.back_end.api.model.Experience;
import resumebuilder.back_end.api.model.GraduationDate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ResumeService {

    private List<Experience> experienceList;
    private int nextId = 1;
    private boolean visible = true;

    public ResumeService() {
        experienceList = new ArrayList<Experience>();

        experienceList.add(new Experience(
                nextId++,
                "The Ohio State University",
                "Columbus, Ohio",
                "Resident Advisor",
                new CustomDate(8, 2018),
                null,
                "Ensured safety and served as a resource for 65+ residents\nFacilitated programs to foster the growth and development of undergraduate students\nAddressed and resolved issues to ensure a quality living experience for all residents in the residence hall",
                true
        ));

        experienceList.add(new Experience(
                nextId++,
                "L Brands",
                "Columbus, Ohio",
                "Operations Management Intern",
                new CustomDate(5, 2019),
                new CustomDate(8, 2019),
                "Developed 40+ new standardized operating procedures to improve efficiency, productivity, and employee morale\nWorked with a team of 10 distribution managers to expand Bath and Body Works operations to a secondary campus",
                true
        ));

        experienceList.add(new Experience(
                nextId++,
                "The Ohio State University Wexner Medical Center",
                "Columbus, Ohio",
                "Supply Chain Intern",
                new CustomDate(5, 2018),
                new CustomDate(8, 2018),
                "Collaborated with the purchasing department to develop metrics for tracking department performance\nResolved several hundred pricing discrepancies\nFormulated standard operating procedures for future interns",
                true
        ));

        experienceList.add(new Experience(
                nextId++,
                "Buckeye Undergraduate Consulting Club",
                "Columbus, Ohio",
                "VP of Marketing and Communications",
                new CustomDate(1, 2017),
                null,
                "Conducted market research on blockchain technology feasibility for wire transactions\nDeveloped analytical skills through Power BI and Tableau workshops\nCompeted in three case competitions",
                false
        ));

        experienceList.add(new Experience(
                nextId++,
                "Phi Chi Theta Professional Business Fraternity",
                "Columbus, Ohio",
                "Professional Development Chair",
                new CustomDate(2, 2018),
                null,
                "Created individualized professional development experiences for new members\nDeveloped and executed workshops to enrich pledges' understanding of brotherhood, professionalism, and philanthropy",
                false
        ));

        experienceList.add(new Experience(
                nextId++,
                "Fisher Emerging Consultants",
                "Columbus, Ohio",
                "Member",
                new CustomDate(2, 2019),
                new CustomDate(4, 2019),
                "Participated in a consulting career readiness program focusing on problem solving, professionalism, and networking",
                false
        ));
    }

    public boolean exists(int id) {
        for(Experience experience: experienceList) {
            if(id == experience.getId()) {
                return true;
            }
        }
        return false;
    }

    public List<Experience> getExperiences() {
        return experienceList;
    }

    public Optional<Experience> getExperience(int id) {
        Optional<Experience> optional = Optional.empty();
        for (Experience experience: experienceList) {
            if(id == experience.getId()) {
                optional = Optional.of(experience);
                return optional;
            }
        }
        return optional;
    }

    public void createExperience(Experience experience) {
        experience.setId(nextId++);
        experienceList.add(experience);
    }

    public Experience updateExperience(int id, Experience updatedExperience) {
        Experience experienceToUpdate = getExperience(id).orElseThrow(() -> new IllegalArgumentException("Experience not found"));

        experienceToUpdate.setCompany(updatedExperience.getCompany());
        experienceToUpdate.setLocation(updatedExperience.getLocation());
        experienceToUpdate.setPosition(updatedExperience.getPosition());
        experienceToUpdate.setStart_date(updatedExperience.getStart_date());
        experienceToUpdate.setEnd_date(updatedExperience.getEnd_date());
        experienceToUpdate.setDescription(updatedExperience.getDescription());
        experienceToUpdate.setVisible(updatedExperience.isVisible());

        return experienceToUpdate;
    }

    public Experience partialUpdateExperience(int id, Map<String, Object> updates) {
        Experience experienceToPatch = getExperience(id).orElseThrow(() -> new IllegalArgumentException("Experience not found"));

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


    public Optional<Experience> deleteExperience(int id) {
        for (Experience experience: experienceList) {
            if (experience.getId() == id) {
                experienceList.remove(experience);
                return Optional.of(experience);
            }
        }
        return Optional.empty();
    }
}