package resumebuilder.back_end.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.api.model.Experience;
import resumebuilder.back_end.api.model.Resume;
import resumebuilder.back_end.service.ResumeService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ResumeController {

    private ResumeService resumeService;

    @Autowired
    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/")
    public ResponseEntity<String> getMethodTest() {
        System.out.println("is in / path");
        return ResponseEntity.ok("the api is working");
    }

    @GetMapping("/{resumeId}")
    public ResponseEntity<Resume> getResume(@PathVariable("resumeId") int resumeId) {
        if(resumeService.getResume(resumeId).isPresent()) {
            return new ResponseEntity<Resume>(resumeService.getResume(resumeId).get(), HttpStatus.OK);
        } 
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{resumeId}")
    public ResponseEntity<Resume> updateResume(@PathVariable("resumeId") int resumeId, @RequestBody Resume resume) {
        if(resume.getContactMethods() != null){
            System.out.println("no contact methods");
        } else {
            System.out.println(resume.getContactMethods());
        }

        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }

    // EXPERIENCE MAPPINGS -------------------------------

    @GetMapping("/{resumeId}/experiences")
    public ResponseEntity<List<Experience>> getExperiences(@PathVariable("resumeId") int resumeId) {
        Optional<List<Experience>> optional = resumeService.getExperiences(resumeId);
        if (optional.isPresent()) {
            return new ResponseEntity<List<Experience>>(optional.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{resumeId}/experiences/{experienceId}")
    public ResponseEntity<Experience> getExperience(@PathVariable("resumeId") int resumeId,
            @PathVariable("experienceId") int experienceId) {
        Optional<Experience> experience = resumeService.getExperience(resumeId, experienceId);
        if (experience.isPresent()) {
            return new ResponseEntity<>(experience.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{resumeId}/experiences")
    public ResponseEntity<Experience> createExperience(@PathVariable("resumeId") int resumeId,
            @RequestBody Experience experience) {
        // ! is taking in an id, but the id should be created on the back-end
        try {
            resumeService.createExperience(resumeId, experience);
            return new ResponseEntity<>(experience, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{resumeId}/experiences/{id}")
    public ResponseEntity<Experience> updateExperience(
            @PathVariable("resumeId") int resumeId, @RequestBody Experience updatedExperience) {
        Optional<Experience> existingExperienceOpt = resumeService.getExperience(resumeId, updatedExperience.getId());
        if (!existingExperienceOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<Experience> updated = resumeService.updateExperience(resumeId, updatedExperience.getId(),
                updatedExperience);
        if (updated.isPresent()) {
            return new ResponseEntity<>(updated.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PatchMapping("{resumeId}/experiences/{experienceId}")
    public ResponseEntity<Experience> patchExperience(
            @PathVariable("resumeId") int resumeId, @PathVariable("experienceId") int experienceId,
            @RequestBody Map<String, Object> updates) {
        // Fetch the existing experience
        Optional<Experience> existingExperienceOpt = resumeService.getExperience(resumeId, experienceId);

        if (!existingExperienceOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Partially update the experience
        Experience updatedExperience = resumeService.partialUpdateExperience(resumeId, experienceId, updates);

        return new ResponseEntity<>(updatedExperience, HttpStatus.OK);
    }

    @DeleteMapping("{resumeId}/experiences/{experienceId}")
    public ResponseEntity<Experience> deleteExperience(@PathVariable("resumeId") int resumeId,
            @PathVariable("experienceId") int experienceId) {
        Optional<Experience> deletedExperience = resumeService.deleteExperience(resumeId, experienceId);
        if (deletedExperience.isPresent()) {
            return new ResponseEntity<>(deletedExperience.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
