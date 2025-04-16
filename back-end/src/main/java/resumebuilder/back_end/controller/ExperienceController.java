package resumebuilder.back_end.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("@componentSecurity.canAccessUser(authentication, #experienceDto.userId)")
    public ResponseEntity<ExperienceDto> createExperience(@RequestBody ExperienceDto experienceDto) {
        ExperienceDto createdExperience = experienceService.save(experienceDto);
        return new ResponseEntity<>(createdExperience, HttpStatus.CREATED);
    }

    @GetMapping("")
    @PreAuthorize("@componentSecurity.canAccessUser(authentication, #userId)")
    ResponseEntity<List<ExperienceDto>> getAllExperiences(@RequestParam(value = "userId") String userId) {
        List<ExperienceDto> experiences = experienceService.findAll(userId);
        if (experiences.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(experiences, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("@componentSecurity.hasAccessToExperience(authentication, #experienceId)")
    public ResponseEntity<ExperienceDto> getExperience(@PathVariable("id") String experienceId) {
        ExperienceDto experience = experienceService.findOne(experienceId);
        return new ResponseEntity<>(experience, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("@componentSecurity.hasAccessToExperience(authentication, #experienceId)")
    public ResponseEntity<ExperienceDto> updateExperience(@PathVariable("id") String experienceId,
            @RequestBody ExperienceDto experienceDto) {
        ExperienceDto updatedExperience = experienceService.update(experienceId, experienceDto);
        return new ResponseEntity<>(updatedExperience, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@componentSecurity.hasAccessToExperience(authentication, #experienceId)")
    public ResponseEntity<ExperienceDto> deleteExperience(@PathVariable("id") String experienceId) {
        experienceService.delete(experienceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
