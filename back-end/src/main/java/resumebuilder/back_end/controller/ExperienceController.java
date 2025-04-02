package resumebuilder.back_end.controller;

import com.azure.core.annotation.Get;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.ExperienceDto;
import resumebuilder.back_end.service.ExperienceService;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/experience")
public class ExperienceController {
    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @PostMapping("")
    public ResponseEntity<ExperienceDto> createExperience(@RequestParam(value = "userId") String userId, @RequestBody ExperienceDto experienceDto) {
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        experienceDto.setUserId(userId);
        Optional<ExperienceDto> createdExperience = Optional.ofNullable(experienceService.save(experienceDto));
        if (createdExperience.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("")
    ResponseEntity<List<ExperienceDto>> getAllExperiences(@RequestParam(value = "userId") String userId) {
        List<ExperienceDto> experiences = experienceService.getExperiencesForUser(userId);
        if (experiences.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(experiences, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceDto> getExperience(@PathVariable("id") String id, @RequestParam(value = "userId") String userId) {
        Optional<ExperienceDto> experience = experienceService.findExperienceForUser(userId, id);
        if (experience.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(experience.get(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceDto> updateExperience(@PathVariable("id") String id, @RequestParam("userId") String userId, @RequestBody ExperienceDto experienceDto
    ) {
        Optional<ExperienceDto> updatedExperience = experienceService.updateExperienceForUser(userId, id, experienceDto);
        if (updatedExperience.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedExperience.get(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ExperienceDto> deleteExperience(@PathVariable("id") String id, @RequestParam("userId") String userId) {
        experienceService.deleteExperienceForUser(userId, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
