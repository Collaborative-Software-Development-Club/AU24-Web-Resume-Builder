package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.ResumeDto;
import resumebuilder.back_end.domain.entities.*;
import resumebuilder.back_end.error_handling.exceptions.ResumeNotFoundException;
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

    public ResumeDto save(ResumeDto resumeDto) {
        ResumeEntity resumeEntity = resumeMapper.mapToEntity(resumeDto);
        resumeRepository.save(resumeEntity);
        return resumeMapper.mapToDto(resumeEntity);
    }

    public List<ResumeDto> findAll() {
        List<ResumeEntity> resumes = new ArrayList<>(resumeRepository.findAll());
        return resumes.stream()
                .map(resumeMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public Optional<ResumeDto> findOne(String id) {
        Optional<ResumeEntity> resume = resumeRepository.findById(id);
        return resume.map(resumeMapper::mapToDto);
    }

    public ResumeDto partialUpdate(String id, ResumeDto resumeDto) {
        ResumeEntity resumeEntity = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException(id));

        ResumeDto resume = resumeMapper.mapToDto(resumeEntity);
        Optional.ofNullable(resumeDto.getName()).ifPresent(resume::setName);
        Optional.ofNullable(resumeDto.getEducationSection()).ifPresent(resume::setEducationSection);
        Optional.ofNullable(resumeDto.getExperience()).ifPresent(resume::setExperience);
        Optional.ofNullable(resumeDto.getContactMethods()).ifPresent(resume::setContactMethods);
        Optional.ofNullable(resumeDto.getSkills()).ifPresent(resume::setSkills);
        Optional.ofNullable(resumeDto.getProjects()).ifPresent(resume::setProjects);
        Optional.ofNullable(resumeDto.getDescription()).ifPresent(resume::setDescription);
        Optional.ofNullable(resumeDto.getOrderOfSections()).ifPresent(resume::setOrderOfSections);
        Optional.ofNullable(resumeDto.getProfessionalSummary()).ifPresent(resume::setProfessionalSummary);
        ResumeEntity updatedResume = resumeRepository.save(resumeMapper.mapToEntity(resume));
        return resumeMapper.mapToDto(updatedResume);
    }

    public void delete(String id) {
        resumeRepository.deleteById(id);
    }

    public List<ResumeDto> findByUserId(String userId) {
        List<ResumeEntity> resumeEntities = resumeRepository.findByUserId(userId);
        return resumeEntities.stream()
                .map(entity -> mapToDto(entity))
                .filter(dto -> dto.isPresent())
                .map(dto -> dto.get())
                .collect(Collectors.toList());
    }

    private Optional<ResumeDto> mapToDto(ResumeEntity resumeEntity) {
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
}
