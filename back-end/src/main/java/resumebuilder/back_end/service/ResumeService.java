package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.*;
import resumebuilder.back_end.error_handling.exceptions.ResumeNotFoundException;
import resumebuilder.back_end.mappers.ResumeMapper;
import resumebuilder.back_end.repository.ExperienceRepository;
import resumebuilder.back_end.repository.ProjectRepository;
import resumebuilder.back_end.repository.ResumeRepository;
import resumebuilder.back_end.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ExperienceRepository experienceRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ResumeMapper resumeMapper;

    public ResumeService(ResumeRepository resumeRepository, ExperienceRepository experienceRepository, ProjectRepository projectRepository, UserRepository userRepository, ResumeMapper resumeMapper) {
        this.resumeRepository = resumeRepository;
        this.experienceRepository = experienceRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.resumeMapper = resumeMapper;
    }

    public boolean exists(String id) {
        return resumeRepository.existsById(id);
    }

    public Optional<ResumeDto> save(ResumeDto resumeDto) {
        ResumeEntity resumeEntity = this.createAndSaveEntities(resumeDto);
        System.out.println("created entities");
        return this.createDto(resumeEntity);
    }

    public Optional<ResumeDto> update(String resumeId, ResumeDto resumeDto) {
        if(!resumeRepository.existsById(resumeId)) {
            return Optional.empty();
        }
        ResumeEntity resumeEntity = this.createAndSaveEntities(resumeDto);
        return this.createDto(resumeEntity);
    }

    public Optional<ResumeDto> findOne(String id) {
        Optional<ResumeEntity> resume = resumeRepository.findById(id);
        if(resume.isEmpty()) {
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

    private Optional<ResumeDto> createDto(ResumeEntity resumeEntity) {
        String resumeId = resumeEntity.getId();
        List<ExperienceEntity> experienceEntities = experienceRepository.findByResumeIdsContaining(resumeId);
        List<ProjectEntity> projectEntities = projectRepository.findByResumeIdsContaining(resumeId);
        Optional<UserEntity> userEntity = userRepository.findById(resumeEntity.getUserId());
        if (userEntity.isEmpty()) {
            return Optional.empty();
        }
        ResumeDto resumeDto = resumeMapper.mapToDto(resumeEntity, experienceEntities, projectEntities, userEntity.get());
        return Optional.ofNullable(resumeDto); // should never be null; if it is that means mapper messed up
    }

    private ResumeEntity createAndSaveEntities(ResumeDto resumeDto){
        List<ExperienceEntity> experienceEntities = new ArrayList<>();
        List<ProjectEntity> projectEntities = new ArrayList<>();
        Optional<UserEntity> userEntity = userRepository.findById(resumeDto.getUserId()); 
        if(userEntity.isEmpty()) {
            return null;
        }
        ResumeEntity resumeEntity = resumeMapper.mapToEntity(resumeDto, experienceEntities, projectEntities, userEntity.get());
        resumeRepository.save(resumeEntity);
        experienceRepository.saveAll(experienceEntities);
        projectRepository.saveAll(projectEntities);
        return resumeEntity;
    }
}
