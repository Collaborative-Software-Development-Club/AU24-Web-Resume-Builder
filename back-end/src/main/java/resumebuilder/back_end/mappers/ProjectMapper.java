package resumebuilder.back_end.mappers;

import java.util.List;

import resumebuilder.back_end.domain.dto.ProjectDto;
import resumebuilder.back_end.domain.entities.ProjectEntity;
import resumebuilder.back_end.domain.model.Project;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {
    private ModelMapper modelMapper;

    public ProjectMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public List<ProjectEntity> mapToEntity(List<Project> projectsFromDto, String userId) {
        List<ProjectEntity> entities = projectsFromDto.stream()
                .map(project -> modelMapper.map(project, ProjectEntity.class)).toList();
        entities.forEach(pe -> pe.setUserId(userId));
        return entities;
    }

    public List<Project> mapToProject(List<ProjectEntity> projectEntities) {
        return projectEntities.stream()
                .map(entity -> new Project(entity.getId(), entity.getTitle(), entity.getOrganization(),
                        entity.getLocation(),
                        entity.getStartDate(), entity.getEndDate(), entity.getDescription()))
                .collect(Collectors.toList());
    }

    public ProjectEntity mapToEntity(ProjectDto projectDto) {
        return modelMapper.map(projectDto, ProjectEntity.class);
    }

    public ProjectDto mapToDto(ProjectEntity projectEntity) {
        return modelMapper.map(projectEntity, ProjectDto.class);
    }

}
