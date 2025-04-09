package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.ExperienceDto;
import resumebuilder.back_end.domain.entities.ExperienceEntity;
import resumebuilder.back_end.mappers.ExperienceMapper;
import resumebuilder.back_end.repository.ExperienceRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExperienceService {
    private final ExperienceRepository experienceRepository;
    private final ExperienceMapper experienceMapper;

    public ExperienceService(ExperienceRepository experienceRepository, ExperienceMapper experienceMapper) {
        this.experienceRepository = experienceRepository;
        this.experienceMapper = experienceMapper;
    }

    // Create list of Dtos for a given userId
    public List<ExperienceDto> getExperiencesForUser(String userId) {
        List<ExperienceEntity> experienceEntities = experienceRepository.findByUserId(userId);
        return this.createDtos(experienceEntities);
    }

    // Create list of dtos from list of entities
    private List<ExperienceDto> createDtos(List<ExperienceEntity> experienceEntities) {
        return experienceEntities.stream()
                .map(entity -> experienceMapper.mapToDto(entity))
                .collect(Collectors.toList());
    }

    // Find experience by id
    public Optional<ExperienceDto> findOne(String experienceId) {
        Optional<ExperienceEntity> entity = experienceRepository.findById(experienceId);
        if (entity.isEmpty()) {
            return Optional.empty();
        }
        return Optional.ofNullable(experienceMapper.mapToDto(entity.get()));
    }

    // Save experience to database
    public ExperienceDto save(ExperienceDto experienceDto) {
        ExperienceEntity entity = experienceMapper.mapToEntity(experienceDto);
        experienceRepository.save(entity);
        return experienceMapper.mapToDto(entity);
    }

    // Update experience in db using exp id, dto
    public Optional<ExperienceDto> update(String experienceId, ExperienceDto updatedExperience) {
        Optional<ExperienceEntity> ee = experienceRepository.findById(experienceId);
        if (ee.isEmpty()) {
            return Optional.empty();
        }
        ExperienceEntity existingExperience = ee.get();
        existingExperience.setCompany(updatedExperience.getCompany());
        existingExperience.setLocation(updatedExperience.getLocation());
        existingExperience.setPosition(updatedExperience.getPosition());
        existingExperience.setStartDate(updatedExperience.getStartDate());
        existingExperience.setEndDate(updatedExperience.getEndDate());
        existingExperience.setDescription(updatedExperience.getDescription());
        ExperienceEntity savedEntity = experienceRepository.save(existingExperience);
        return Optional.of(experienceMapper.mapToDto(savedEntity));
    }

    // Delete experience for specific user
    public void delete(String experienceId) {
        experienceRepository.deleteById(experienceId);
    }

}
