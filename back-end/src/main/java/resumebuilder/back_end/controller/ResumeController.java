package resumebuilder.back_end.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.CreateResumeDto;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.service.ResumeService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/v1/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("")
    public ResponseEntity<ResumeDto> create(@RequestBody CreateResumeDto ids) {
        String userId = ids.getUserId();
        String resumeId = ids.getResumeId();
        ResumeDto savedResume;

        if (resumeId != null) {
            savedResume = resumeService.duplicate(userId, resumeId);
        } else if (userId != null) {
            savedResume = resumeService.create(userId);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(savedResume, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<List<ResumeDto>> getAllResumes(@RequestParam(value = "userId") String userId) {
        List<ResumeDto> resumes = resumeService.findByUserId(userId);
        if (resumes.isEmpty()) {
            // case for valid user but no resumes
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(resumes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeDto> getResume(@PathVariable("id") String id) {
        ResumeDto resume = resumeService.findOne(id);
        return new ResponseEntity<>(resume, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeDto> updateResume(
            @PathVariable("id") String id,
            @RequestBody ResumeDto resumeDto) {
        // System.out.println("PUT /resume");
        ResumeDto updatedResume = resumeService.update(id, resumeDto);
        return new ResponseEntity<>(updatedResume, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResumeDto> deleteResume(@PathVariable("id") String id) {
        resumeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
