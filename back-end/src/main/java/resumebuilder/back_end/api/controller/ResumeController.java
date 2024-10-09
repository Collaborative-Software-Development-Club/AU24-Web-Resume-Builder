package resumebuilder.back_end.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.api.model.Resume;
import resumebuilder.back_end.service.ResumeService;


import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/resume")
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

    @PostMapping("/")
    public ResponseEntity<Resume> createResume(@RequestBody Resume resume) {
        try {
            Resume createdResume = resumeService.createResume(resume);
            return new ResponseEntity<>(createdResume, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{resumeId}")
    public ResponseEntity<Resume> deleteResume(@PathVariable("resumeId") int resumeId) {
        Optional<Resume> deletedResume = resumeService.deleteResume(resumeId);
        if (deletedResume.isPresent()) {
            return new ResponseEntity<>(deletedResume.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PatchMapping("/{resumeId}")
    public ResponseEntity<Resume> updateResume(@PathVariable("resumeId") int resumeId, @RequestBody Resume resume) {
        if (resumeService.getResume(resumeId).isPresent()) {
            Optional<Resume> updatedResume = resumeService.partialUpdateResume(resumeId, resume);
            if (updatedResume.isPresent()) {
                return new ResponseEntity<>(updatedResume.get(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //! experience methods and individual mappings were removed to not cause confusion, if needed they can be added back from version control

}
