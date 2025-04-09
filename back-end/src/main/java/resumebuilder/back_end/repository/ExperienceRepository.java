package resumebuilder.back_end.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import resumebuilder.back_end.domain.entities.ExperienceEntity;

import java.util.List;
import java.util.Optional;

public interface ExperienceRepository extends MongoRepository<ExperienceEntity, String> {
    public List<ExperienceEntity> findByUserId(String userId);

    public Optional<ExperienceEntity> findByUserIdAndId(String userId, String id);

    public void deleteByUserIdAndId(String userId, String id);
}
