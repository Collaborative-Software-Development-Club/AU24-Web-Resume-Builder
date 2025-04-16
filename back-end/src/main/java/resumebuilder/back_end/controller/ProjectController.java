package resumebuilder.back_end.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resumebuilder.back_end.domain.dto.ProjectDto;
import resumebuilder.back_end.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("")
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto) {
        ProjectDto createdProject = projectService.save(projectDto);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable("id") String projectId,

            @RequestBody ProjectDto projectDto) {
        ProjectDto updatedResume = projectService.update(projectId, projectDto);
        return new ResponseEntity<>(updatedResume, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<ProjectDto>> getAllProjects(@RequestParam(value = "userId") String userId) {
        List<ProjectDto> projects = projectService.findAll(userId);
        if (projects.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable("id") String projectId) {
        ProjectDto project = projectService.findOne(projectId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProjectDto> deleteProject(@PathVariable("id") String projectId) {
        projectService.delete(projectId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
