package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.ExperienceDto;
import resumebuilder.back_end.domain.entities.ExperienceEntity;
import resumebuilder.back_end.error_handling.exceptions.InvalidExperienceIDException;
import resumebuilder.back_end.error_handling.exceptions.InvalidProjectIDException;
import resumebuilder.back_end.error_handling.exceptions.InvalidUserIDException;
import resumebuilder.back_end.mappers.ExperienceMapper;
import resumebuilder.back_end.repository.ExperienceRepository;
import resumebuilder.back_end.repository.UserRepository;

import java.util.List;

@Service
public class ExperienceService {
    private final ExperienceRepository experienceRepository;
    private final ExperienceMapper experienceMapper;
    private final UserRepository userRepository;

    public ExperienceService(ExperienceRepository experienceRepository, ExperienceMapper experienceMapper,
            UserRepository userRepository) {
        this.experienceRepository = experienceRepository;
        this.experienceMapper = experienceMapper;
        this.userRepository = userRepository;
    }

    public boolean exists(String id) {
        return experienceRepository.existsById(id);
    }

    // Create list of Dtos for a given userId
    public List<ExperienceDto> findAll(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new InvalidUserIDException(userId);
        }
        List<ExperienceEntity> experienceEntities = experienceRepository.findByUserId(userId);
        return this.createDtos(experienceEntities);
    }

    // Create list of dtos from list of entities
    private List<ExperienceDto> createDtos(List<ExperienceEntity> experienceEntities) {
        return experienceEntities.stream()
                .map(entity -> experienceMapper.mapToDto(entity)).toList();
    }

    // Find experience by id
    public ExperienceDto findOne(String experienceId) {
        ExperienceEntity entity = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new InvalidExperienceIDException(experienceId));
        return experienceMapper.mapToDto(entity);
    }

    // Save experience to database
    public ExperienceDto save(ExperienceDto experienceDto) {
        ExperienceEntity entity = experienceMapper.mapToEntity(experienceDto);
        experienceRepository.save(entity);
        return experienceMapper.mapToDto(entity);
    }

    // Update experience in db using exp id, dto
    public ExperienceDto update(String experienceId, ExperienceDto updatedExperience) {
        if (!userRepository.existsById(updatedExperience.getUserId())) {
            throw new InvalidUserIDException(updatedExperience.getUserId());
        }
        if (!experienceRepository.existsById(experienceId)) {
            throw new InvalidExperienceIDException(experienceId);
        }
        // since db will check the id in DTO, is has to be the one provided in the
        // endpoint and not be null
        // in reality, we should have used a DTO specific to a create/update request
        updatedExperience.setId(experienceId);
        ExperienceEntity ee = experienceMapper.mapToEntity(updatedExperience);
        return experienceMapper.mapToDto(ee);
    }

    // Delete experience for specific user
    public void delete(String experienceId) {
        if (!experienceRepository.existsById(experienceId)) {
            throw new InvalidProjectIDException(experienceId);
        }
        experienceRepository.deleteById(experienceId);
    }

}
