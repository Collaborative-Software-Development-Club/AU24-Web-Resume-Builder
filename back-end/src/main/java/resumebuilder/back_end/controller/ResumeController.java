package resumebuilder.back_end.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.ResumeEntity;
import resumebuilder.back_end.service.ResumeService;


import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("")
    public ResponseEntity<ResumeDto> createResume(@RequestBody ResumeDto resumeDto) {
        ResumeDto createdResume = resumeService.save(resumeDto);
        return new ResponseEntity<>(createdResume, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<List<ResumeDto>> getAllResumes() {
        List<ResumeDto> resumes = resumeService.findAll();
        if (resumes.isEmpty()) {
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
    public ResponseEntity<ResumeDto> fullUpdateResume(
            @PathVariable("id") String id,
            @RequestBody ResumeDto resumeDto
    ) {
        if(!resumeService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ResumeDto updatedResume = resumeService.save(resumeDto);
        return new ResponseEntity<>(updatedResume, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResumeDto> partialUpdateResume(
            @PathVariable("id") String id,
            @RequestBody ResumeDto resumeDto
    ) {
        if(!resumeService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ResumeDto updatedResume = resumeService.partialUpdate(id, resumeDto);
        return new ResponseEntity<>(updatedResume, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResumeDto> deleteResume(@PathVariable("id") String id) {
        resumeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
