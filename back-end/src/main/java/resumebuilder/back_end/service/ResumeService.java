package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.api.model.*;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

    public Resume createResume(Resume newResume) {
        Resume createdResume = new Resume();
        createdResume.setSkills(newResume.getSkills());
        createdResume.setExperience(newResume.getExperience());
        resumes.add(createdResume);

        return createdResume;
    }

    public Optional<Resume> deleteResume(int id) {
        for (Resume resume : resumes) {
            if (resume.getId() == id) {
                resumes.remove(resume);
                return Optional.of(resume);
            }
        }
        return Optional.empty();
    }
    public Optional<Resume> partialUpdateResume(int resumeId, Resume updatedResume) {
        System.out.println(updatedResume);
        for (Resume resume : resumes) {
            if (resume.getId() == resumeId) {
                if (updatedResume.getExperience() != null) {
                    resume.setExperience(updatedResume.getExperience());
                }
                if(resume.getContactMethods() != null){
                    resume.setContactMethods(updatedResume.getContactMethods());
                }
                if (updatedResume.getSkills() != null) {
                    resume.setSkills(updatedResume.getSkills());
                }
                if (updatedResume.getEducation() != null) {
                    resume.setEducation(updatedResume.getEducation());
                }
                if (updatedResume.getName() != null) {
                    resume.setName(updatedResume.getName());
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

    //! individual experience methods were removed to not cause confusion, if needed they can be added back from version control

    private Resume createSampleResume() {
        List<ExperienceItem> experienceList = new ArrayList<ExperienceItem>();
        List<Honor> honorList = new ArrayList<>();
        honorList.add(new Honor("Fisher Pacesetter Award", "Given to the top one percent of students based on academic performance and demonstrated leadership ability"));
        honorList.add(new Honor("Honors Cohort Program", "One of 30 students selected to participate in the College of Business’ flagship two-year academic program"));

        EducationSection education = new EducationSection(
            "The Ohio State University",
		    "Columbus, Ohio",
		    "Bachelor of Science in Business Administration",
		    new GraduationDate(5, 2021),
		    "Finance",
		    "Business Analytics",
		    4.0,
            honorList
        );
        
        experienceList.add(new ExperienceItem(
                nextId++,
                "The Ohio State University",
                "Columbus, Ohio",
                "Resident Advisor",
                new CustomDate(8, 2018),
                null,
                "Ensured safety and served as a resource for 65+ residents\nFacilitated programs to foster the growth and development of undergraduate students\nAddressed and resolved issues to ensure a quality living experience for all residents in the residence hall",
                true));

        experienceList.add(new ExperienceItem(
                nextId++,
                "L Brands",
                "Columbus, Ohio",
                "Operations Management Intern",
                new CustomDate(5, 2019),
                new CustomDate(8, 2019),
                "Developed 40+ new standardized operating procedures to improve efficiency, productivity, and employee morale\nWorked with a team of 10 distribution managers to expand Bath and Body Works operations to a secondary campus",
                true));

        experienceList.add(new ExperienceItem(
                nextId++,
                "The Ohio State University Wexner Medical Center",
                "Columbus, Ohio",
                "Supply Chain Intern",
                new CustomDate(5, 2018),
                new CustomDate(8, 2018),
                "Collaborated with the purchasing department to develop metrics for tracking department performance\nResolved several hundred pricing discrepancies\nFormulated standard operating procedures for future interns",
                true));

        experienceList.add(new ExperienceItem(
                nextId++,
                "Buckeye Undergraduate Consulting Club",
                "Columbus, Ohio",
                "VP of Marketing and Communications",
                new CustomDate(1, 2017),
                null,
                "Conducted market research on blockchain technology feasibility for wire transactions\nDeveloped analytical skills through Power BI and Tableau workshops\nCompeted in three case competitions",
                false));

        experienceList.add(new ExperienceItem(
                nextId++,
                "Phi Chi Theta Professional Business Fraternity",
                "Columbus, Ohio",
                "Professional Development Chair",
                new CustomDate(2, 2018),
                null,
                "Created individualized professional development experiences for new members\nDeveloped and executed workshops to enrich pledges' understanding of brotherhood, professionalism, and philanthropy",
                false));

        experienceList.add(new ExperienceItem(
                nextId++,
                "Fisher Emerging Consultants",
                "Columbus, Ohio",
                "Member",
                new CustomDate(2, 2019),
                new CustomDate(4, 2019),
                "Participated in a consulting career readiness program focusing on problem solving, professionalism, and networking",
                false));

        List<String> skillsList = new ArrayList<>();

        skillsList.add("Archery");
        skillsList.add("Java");
        skillsList.add("Python");
        skillsList.add("Italian");

        Resume resume = new Resume();
        resume.setName("Brutus Buckeye");
        resume.setEducation(education);
        resume.setExperience(new ExperienceSection(experienceList));
        String[] contactMethods = {"buckeye.1@osu.edu", "614-222-2222", "100 Ohio State Ave, Columbus OH, 43210"};
        resume.setContactMethods(Arrays.asList(contactMethods));
        resume.setSkills(skillsList);
        return resume;
    }
}
