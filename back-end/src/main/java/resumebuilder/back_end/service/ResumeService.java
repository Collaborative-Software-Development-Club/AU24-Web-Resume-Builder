package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.*;
import resumebuilder.back_end.error_handling.exceptions.InvalidUserIDException;
import resumebuilder.back_end.error_handling.exceptions.ResumeNotFoundException;
import resumebuilder.back_end.mappers.ExperienceMapper;
import resumebuilder.back_end.mappers.ProjectMapper;
import resumebuilder.back_end.mappers.ResumeMapper;
import resumebuilder.back_end.mappers.UserMapper;
import resumebuilder.back_end.repository.ExperienceRepository;
import resumebuilder.back_end.repository.ProjectRepository;
import resumebuilder.back_end.repository.ResumeRepository;
import resumebuilder.back_end.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ExperienceRepository experienceRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ResumeMapper resumeMapper;
    private final ExperienceMapper experienceMapper;
    private final ProjectMapper projectMapper;
    private final UserMapper userMapper;

    public ResumeService(ResumeRepository resumeRepository, ExperienceRepository experienceRepository,
            ProjectRepository projectRepository, UserRepository userRepository, ResumeMapper resumeMapper,
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

    public ResumeDto create(String userId) {
        // System.out.println("resumeDto service>save");
        // System.out.println(resumeDto);
        if (!userRepository.existsById(userId)) {
            throw new InvalidUserIDException(userId);
        }
        ResumeEntity emptyResume = new ResumeEntity(userId);
        resumeRepository.save(emptyResume);
        ResumeDto createdResumeDto = this.createDto(emptyResume);
        // System.out.println("createdResumeDto in service>save");
        // System.out.println(createdResumeDto.get());
        return createdResumeDto;
    }

    public ResumeDto duplicate(String userId, String resumeId) {
        ResumeEntity resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResumeNotFoundException(resumeId));
        resume.setId(null);
        resume.setDescription("Copy of " + resume.getDescription());
        resumeRepository.save(resume); // should save a new copy since ResumeEntity id is null
        return this.createDto(resume);
    }

    public ResumeDto update(String resumeId, ResumeDto resumeDto) {
        // just in case there's something up with the requeset
        resumeDto.setId(resumeId);
        // System.out.println("resumeDto service>update");
        // System.out.println(resumeDto);
        if (!resumeRepository.existsById(resumeId)) {
            throw new ResumeNotFoundException(resumeId);
        }
        ResumeEntity updated = this.createAndSaveEntities(resumeDto);
        ResumeDto createdResumeDto = this.createDto(updated);
        // System.out.println("createdResumeDto in service>save");
        // System.out.println(createdResumeDto.get());
        return createdResumeDto;
    }

    public ResumeDto findOne(String id) {
        ResumeEntity resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException(id));
        return this.createDto(resume);
    }

    public void delete(String id) {
        resumeRepository.deleteById(id);
    }

    public List<ResumeDto> findByUserId(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new InvalidUserIDException(userId);
        }
        List<ResumeEntity> resumeEntities = resumeRepository.findByUserId(userId);
        return this.createDtos(resumeEntities);
    }

    private List<ResumeDto> createDtos(List<ResumeEntity> resumeEntities) {
        return resumeEntities.stream()
                .map(this::createDto)
                .collect(Collectors.toList());
    }

    private ResumeEntity createAndSaveEntities(ResumeDto resumeDto) {
        // System.out.println("In createAndSaveEntities");
        String userId = resumeDto.getUserId();
        UserEntity userEntity = userRepository.findById(resumeDto.getUserId())
                .orElseThrow(() -> new InvalidUserIDException(userId));
        // extract experiences and projects from resumeDto as entities
        List<ExperienceEntity> experienceEntities = experienceMapper
                .mapToEntity(resumeDto.getExperience().getContent(), userEntity.getId());
        List<ProjectEntity> projectEntities = projectMapper.mapToEntity(resumeDto.getProjects().getContent(),
                userEntity.getId());
        // save experiences and projects to the database
        List<ExperienceEntity> savedExperiences = experienceRepository.saveAll(experienceEntities);
        List<ProjectEntity> savedProjects = projectRepository.saveAll(projectEntities);
        // update the experienceIds and projectIds in ResumeEntity
        // these ids have to come from the saved entities, since the database creates
        // the ids for the new ones
        List<String> experienceIds = savedExperiences.stream().map(exp -> exp.getId()).toList();
        List<String> projectIds = savedProjects.stream().map(proj -> proj.getId()).toList();
        ResumeEntity resumeEntity = resumeMapper.mapToEntity(resumeDto, experienceIds, projectIds);
        resumeEntity.setLastModified(LocalDateTime.now());
        ResumeEntity savedResume = resumeRepository.save(resumeEntity);
        // extract user information from resumeDto
        userMapper.addResumeDtoContent(userEntity, resumeDto);
        userRepository.save(userEntity);
        // System.out.println("Finished createAndSaveEntities");
        return savedResume;
    }

    private ResumeDto createDto(ResumeEntity resumeEntity) {
        List<ExperienceEntity> experienceEntities = experienceRepository.findAllById(resumeEntity.getExperienceIds());
        List<ProjectEntity> projectEntities = projectRepository.findAllById(resumeEntity.getProjectIds());
        String userId = resumeEntity.getUserId();
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidUserIDException(userId));

        return resumeMapper.mapToDto(
                resumeEntity,
                experienceMapper.mapToExperienceItem(experienceEntities),
                projectMapper.mapToProject(projectEntities),
                userEntity);
    }
}
