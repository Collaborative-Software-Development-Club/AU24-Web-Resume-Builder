package resumebuilder.back_end.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import resumebuilder.back_end.domain.entities.ResumeEntity;

import java.util.List;

@Repository
public interface ResumeRepository extends MongoRepository<ResumeEntity, String> {
    public List<ResumeEntity> findByUserId(String userId);
}
