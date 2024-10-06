package resumebuilder.back_end.service;

import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.entities.*;
import resumebuilder.back_end.repository.ResumeRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public boolean exists(String id) {
        return resumeRepository.existsById(id);
    }

    public ResumeEntity save(ResumeEntity resumeEntity) {
        return resumeRepository.save(resumeEntity);
    }

    public List<ResumeEntity> findAll() {
        return new ArrayList<>(resumeRepository.findAll());
    }

    public Optional<ResumeEntity> findOne(String id) {
        return resumeRepository.findById(id);
    }

    public ResumeEntity partialUpdate(String id, ResumeEntity resumeEntity) {
        return resumeRepository.findById(id)
                .map(existingResume -> {
                    Optional.ofNullable(resumeEntity.getName()).ifPresent(existingResume::setName);
                    Optional.ofNullable(resumeEntity.getEducation()).ifPresent(existingResume::setEducation);
                    Optional.ofNullable(resumeEntity.getExperiences()).ifPresent(existingResume::setExperiences);
                    Optional.ofNullable(resumeEntity.getContactMethods()).ifPresent(existingResume::setContactMethods);
                    Optional.ofNullable(resumeEntity.getSkills()).ifPresent(existingResume::setSkills);
                    return resumeRepository.save(existingResume);
                }).orElseThrow(() -> new RuntimeException("Resume does not exist"));
    }

    public void delete(String id) {
        resumeRepository.deleteById(id);
    }

}
