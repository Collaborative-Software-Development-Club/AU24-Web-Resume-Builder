package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.ProjectDto;
import resumebuilder.back_end.domain.entities.ProjectEntity;
import resumebuilder.back_end.error_handling.exceptions.InvalidProjectIDException;
import resumebuilder.back_end.error_handling.exceptions.InvalidUserIDException;
import resumebuilder.back_end.mappers.ProjectMapper;
import resumebuilder.back_end.repository.ProjectRepository;
import resumebuilder.back_end.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository,
            ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.projectMapper = projectMapper;
    }

    public boolean exists(String id) {
        return projectRepository.existsById(id);
    }

    public ProjectDto save(ProjectDto projectDto) {
        ProjectEntity projectEntity = projectMapper.mapToEntity(projectDto);
        projectRepository.save(projectEntity);
        return projectMapper.mapToDto(projectEntity);
    }

    public ProjectDto update(String id, ProjectDto projectDto) {
        if (!projectRepository.existsById(id)) {
            throw new InvalidProjectIDException(id);
        }
        if (!userRepository.existsById(projectDto.getUserId())) {
            throw new InvalidUserIDException(projectDto.getUserId());
        }
        ProjectEntity projectEntity = projectMapper.mapToEntity(projectDto);
        projectRepository.save(projectEntity);
        return projectMapper.mapToDto(projectEntity);
    }

    public List<ProjectDto> findAll(String userId) {
        List<ProjectEntity> projectEntities = projectRepository.findByUserId(userId);
        return projectEntities.stream()
                .map(entity -> projectMapper.mapToDto(entity))
                .collect(Collectors.toList());
    }

    public ProjectDto findOne(String id) {
        ProjectEntity project = projectRepository.findById(id)
                .orElseThrow(() -> new InvalidProjectIDException(id));
        return projectMapper.mapToDto(project);
    }

    public void delete(String id) {
        projectRepository.deleteById(id);
    }

}
