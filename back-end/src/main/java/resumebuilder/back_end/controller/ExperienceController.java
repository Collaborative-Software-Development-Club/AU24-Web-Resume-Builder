package resumebuilder.back_end.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.ExperienceDto;
import resumebuilder.back_end.service.ExperienceService;

import java.util.List;

@RestController
@RequestMapping("/v1/experiences")
public class ExperienceController {
    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @PostMapping("")
    public ResponseEntity<ExperienceDto> createExperience(@RequestBody ExperienceDto experienceDto) {
        ExperienceDto createdExperience = experienceService.save(experienceDto);
        return new ResponseEntity<>(createdExperience, HttpStatus.CREATED);
    }

    @GetMapping("")
    ResponseEntity<List<ExperienceDto>> getAllExperiences(@RequestParam(value = "userId") String userId) {
        List<ExperienceDto> experiences = experienceService.findAll(userId);
        if (experiences.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(experiences, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceDto> getExperience(@PathVariable("id") String id) {
        ExperienceDto experience = experienceService.findOne(id);
        return new ResponseEntity<>(experience, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceDto> updateExperience(@PathVariable("id") String id,
            @RequestBody ExperienceDto experienceDto) {
        ExperienceDto updatedExperience = experienceService.update(id, experienceDto);
        return new ResponseEntity<>(updatedExperience, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ExperienceDto> deleteExperience(@PathVariable("id") String id,
            @RequestParam("userId") String userId) {
        experienceService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
