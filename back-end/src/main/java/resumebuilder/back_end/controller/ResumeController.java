package resumebuilder.back_end.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.CreateResumeDto;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.service.ResumeService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("")
    public ResponseEntity<ResumeDto> duplicateResume(@RequestBody CreateResumeDto ids) {
        String userId = ids.getUserId();
        String resumeId = ids.getResumeId();
        Optional<ResumeDto> savedResume;

        if (resumeId != null) {
            savedResume = resumeService.duplicate(userId, resumeId);
            if (savedResume.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else if (userId != null) {
            savedResume = resumeService.create(userId);
            if (savedResume.isEmpty()) {
                // System.out.println("Error in createResume");
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(savedResume.get(), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<List<ResumeDto>> getAllResumes(@RequestParam(value = "userId") String userId) {
        // System.out.println("In getAllResumes");
        // TODO add a different response for when the userId is invalid (requires proper
        // throwing of errors inside the methods)
        List<ResumeDto> resumes = resumeService.findByUserId(userId);
        if (resumes.isEmpty()) {
            // System.out.println("No resumes found or error");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(resumes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeDto> getResume(@PathVariable("id") String id) {
        Optional<ResumeDto> resume = resumeService.findOne(id);
        if (resume.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(resume.get(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeDto> updateResume(
            @PathVariable("id") String id,
            @RequestBody ResumeDto resumeDto) {
        // System.out.println("PUT /resume");
        Optional<ResumeDto> updatedResume = resumeService.update(id, resumeDto);
        if (updatedResume.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedResume.get(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResumeDto> deleteResume(@PathVariable("id") String id) {
        resumeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
