package resumebuilder.back_end.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import resumebuilder.back_end.domain.entities.ExperienceEntity;

import java.util.List;

public interface ExperienceRepository extends MongoRepository<ExperienceEntity, String> {
    List<ExperienceEntity> findByResumeIdsContaining(String resumeId);
}
