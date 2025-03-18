package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.*;
import resumebuilder.back_end.mappers.ExperienceMapper;
import resumebuilder.back_end.mappers.ProjectMapper;
import resumebuilder.back_end.mappers.ResumeMapper2;
import resumebuilder.back_end.mappers.UserMapper;
import resumebuilder.back_end.repository.ExperienceRepository;
import resumebuilder.back_end.repository.ProjectRepository;
import resumebuilder.back_end.repository.ResumeRepository;
import resumebuilder.back_end.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ExperienceRepository experienceRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ResumeMapper2 resumeMapper;
    private final ExperienceMapper experienceMapper;
    private final ProjectMapper projectMapper;
    private final UserMapper userMapper;

    public ResumeService(ResumeRepository resumeRepository, ExperienceRepository experienceRepository,
            ProjectRepository projectRepository, UserRepository userRepository, ResumeMapper2 resumeMapper,
            ExperienceMapper experienceMapper, ProjectMapper projectMapper, UserMapper userMapper) {
        this.resumeRepository = resumeRepository;
        this.experienceRepository = experienceRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.resumeMapper = resumeMapper;
        this.experienceMapper = experienceMapper;
        this.projectMapper = projectMapper;
        this.userMapper = userMapper;
    }

    public boolean exists(String id) {
        return resumeRepository.existsById(id);
    }

    public Optional<ResumeDto> save(ResumeDto resumeDto) {
        // System.out.println("resumeDto service>save");
        // System.out.println(resumeDto);
        Optional<ResumeEntity> saved = this.createAndSaveEntities(resumeDto);
        if (saved.isEmpty()) {
            return Optional.empty();
        }
        Optional<ResumeDto> createdResumeDto = this.createDto(saved.get());
        // System.out.println("createdResumeDto in service>save");
        // System.out.println(createdResumeDto.get());
        return createdResumeDto;
    }

    public Optional<ResumeDto> update(String resumeId, ResumeDto resumeDto) {
        // System.out.println("resumeDto service>update");
        // System.out.println(resumeDto);
        if (!resumeRepository.existsById(resumeId)) {
            return Optional.empty();
        }
        Optional<ResumeEntity> updated = this.createAndSaveEntities(resumeDto);
        if (updated.isEmpty()) {
            return Optional.empty();
        }
        Optional<ResumeDto> createdResumeDto = this.createDto(updated.get());
        // System.out.println("createdResumeDto in service>save");
        // System.out.println(createdResumeDto.get());
        return createdResumeDto;
    }

    public Optional<ResumeDto> findOne(String id) {
        Optional<ResumeEntity> resume = resumeRepository.findById(id);
        if (resume.isEmpty()) {
            return Optional.empty();
        }
        return this.createDto(resume.get());
    }

    public void delete(String id) {
        resumeRepository.deleteById(id);
    }

    public List<ResumeDto> findByUserId(String userId) {
        List<ResumeEntity> resumeEntities = resumeRepository.findByUserId(userId);
        return this.createDtos(resumeEntities);
    }

    private List<ResumeDto> createDtos(List<ResumeEntity> resumeEntities) {
        return resumeEntities.stream()
                .map(this::createDto)
                .filter(dto -> dto.isPresent())
                .map(dto -> dto.get())
                .collect(Collectors.toList());
    }

    private Optional<ResumeEntity> createAndSaveEntities(ResumeDto resumeDto) {
        Optional<UserEntity> userEntity = userRepository.findById(resumeDto.getUserId());
        if (userEntity.isEmpty()) {
            System.out.println("Invalid user id passed to ResumeService.save");
            return Optional.empty();
        }
        // extract experiences and projects from resumeDto as entities
        List<ExperienceEntity> experienceEntities = experienceMapper
                .mapToEntity(resumeDto.getExperience().getContent());
        List<ProjectEntity> projectEntities = projectMapper.mapToEntity(resumeDto.getProjects().getContent());
        // save experiences and projects to the database
        List<ExperienceEntity> savedExperiences = experienceRepository.saveAll(experienceEntities);
        List<ProjectEntity> savedProjects = projectRepository.saveAll(projectEntities);
        // update the experienceIds and projectIds in ResumeEntity
        // these ids have to come from the saved entities, since the database creates
        // the ids for the new ones
        List<String> experienceIds = savedExperiences.stream().map(exp -> exp.getId()).toList();
        List<String> projectIds = savedProjects.stream().map(proj -> proj.getId()).toList();
        ResumeEntity resumeEntity = resumeMapper.mapToEntity(resumeDto, experienceIds, projectIds);
        ResumeEntity savedResume = resumeRepository.save(resumeEntity);
        // extract user information from resumeDto
        userMapper.addResumeDtoContent(userEntity.get(), resumeDto);
        userRepository.save(userEntity.get());
        return Optional.of(savedResume);
    }

    private Optional<ResumeDto> createDto(ResumeEntity resumeEntity) {
        String resumeId = resumeEntity.getId();
        List<ExperienceEntity> experienceEntities = experienceRepository.findByResumeIdsContaining(resumeId);
        List<ProjectEntity> projectEntities = projectRepository.findByResumeIdsContaining(resumeId);
        Optional<UserEntity> userEntity = userRepository.findById(resumeEntity.getUserId());
        if (userEntity.isEmpty()) {
            return Optional.empty();
        }
        ResumeDto resumeDto = resumeMapper.mapToDto(
                resumeEntity,
                experienceMapper.mapToExperienceItem(experienceEntities),
                projectMapper.mapToProject(projectEntities),
                userEntity.get());
        return Optional.ofNullable(resumeDto); // should never be null; if it is that means mapper messed up
    }
}
