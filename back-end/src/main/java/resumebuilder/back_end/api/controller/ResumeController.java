package resumebuilder.back_end.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.api.model.Experience;
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

    @GetMapping("/experiences")
    public ResponseEntity<List<Experience>> getExperiences() {
        return new ResponseEntity<>(resumeService.getExperiences(), HttpStatus.OK);
    }

    @GetMapping("/experiences/{id}")
    public ResponseEntity<Experience> getExperience(@PathVariable("id") int id) {
        Optional<Experience> experience = resumeService.getExperience(id);

        if (experience.isPresent()) {
            return new ResponseEntity<>(experience.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/experiences")
    public ResponseEntity<Experience> createExperience(@RequestBody Experience experience) {
        resumeService.createExperience(experience);
        return new ResponseEntity<>(experience, HttpStatus.CREATED);
    }

    @PutMapping(path = "/experiences/{id}")
    public ResponseEntity<Experience> updateExperience(
            @PathVariable("id") int id, @RequestBody Experience updatedExperience
    ) {
        Optional<Experience> existingExperienceOpt = resumeService.getExperience(id);

        if (!existingExperienceOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Experience updated = resumeService.updateExperience(id, updatedExperience);

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PatchMapping(path = "/experiences/{id}")
    public ResponseEntity<Experience> patchExperience(
            @PathVariable("id") int id, @RequestBody Map<String, Object> updates
    ) {
        // Fetch the existing experience
        Optional<Experience> existingExperienceOpt = resumeService.getExperience(id);

        if (!existingExperienceOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Partially update the experience
        Experience updatedExperience = resumeService.partialUpdateExperience(id, updates);

        return new ResponseEntity<>(updatedExperience, HttpStatus.OK);
    }

    @DeleteMapping(path = "/experiences/{id}")
    public ResponseEntity<Experience> deleteExperience(@PathVariable("id") int id) {
        Optional<Experience> deletedExperience = resumeService.deleteExperience(id);

        if(deletedExperience.isPresent()) {
            return new ResponseEntity<>(deletedExperience.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
