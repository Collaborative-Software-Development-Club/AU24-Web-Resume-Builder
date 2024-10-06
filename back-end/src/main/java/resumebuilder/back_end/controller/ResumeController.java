package resumebuilder.back_end.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.ResumeEntity;
import resumebuilder.back_end.mappers.ResumeMapper;
import resumebuilder.back_end.repository.ResumeRepository;
import resumebuilder.back_end.service.ResumeService;


import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ResumeController {

    private final ResumeService resumeService;
    private final ResumeMapper resumeMapper;

    public ResumeController(ResumeRepository repository, ResumeService resumeService, ResumeMapper resumeMapper) {
        this.resumeService = resumeService;
        this.resumeMapper = resumeMapper;
    }

    @PostMapping("/resumes")
    public ResponseEntity<ResumeDto> createResume(@RequestBody ResumeDto resumeDto) {
        ResumeEntity resumeEntity = resumeMapper.mapToEntity(resumeDto);
        ResumeEntity createdResume = resumeService.save(resumeEntity);
        return new ResponseEntity<>(resumeMapper.mapToDto(createdResume), HttpStatus.CREATED);
    }

    @GetMapping("/resumes")
    public ResponseEntity<List<ResumeDto>> getAllResumes() {
        List<ResumeEntity> resumes = resumeService.findAll();
        if (resumes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<ResumeDto> resumeDtos = resumes.stream()
                .map(resumeMapper::mapToDto)
                .toList();
        return new ResponseEntity<>(resumeDtos, HttpStatus.OK);
    }

    @GetMapping("/resumes/{id}")
    public ResponseEntity<ResumeDto> getResume(@PathVariable("id") String id) {
        Optional<ResumeEntity> resume = resumeService.findOne(id);
        if (resume.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ResumeDto resumeDto = resumeMapper.mapToDto(resume.get());
        return new ResponseEntity<>(resumeDto, HttpStatus.OK);
    }

    @PutMapping("/resumes/{id}")
    public ResponseEntity<ResumeDto> fullUpdateResume(
            @PathVariable("id") String id,
            @RequestBody ResumeDto resumeDto
    ) {
        if(!resumeService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        resumeDto.setId(id);
        ResumeEntity resume = resumeMapper.mapToEntity(resumeDto);
        ResumeEntity updatedResume = resumeService.save(resume);
        return new ResponseEntity<>(resumeMapper.mapToDto(updatedResume), HttpStatus.OK);
    }

    @PatchMapping("/resumes/{id}")
    public ResponseEntity<ResumeDto> partialUpdateResume(
            @PathVariable("id") String id,
            @RequestBody ResumeDto resumeDto
    ) {
        if(!resumeService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        resumeDto.setId(id);
        ResumeEntity resume = resumeMapper.mapToEntity(resumeDto);
        ResumeEntity updatedResume = resumeService.partialUpdate(id, resume);
        return new ResponseEntity<>(resumeMapper.mapToDto(updatedResume), HttpStatus.OK);
    }

    @DeleteMapping("/resumes/{id}")
    public ResponseEntity<ResumeDto> deleteResume(@PathVariable("id") String id) {
        resumeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
