package resumebuilder.back_end.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import resumebuilder.back_end.domain.entities.ResumeEntity;

public interface ResumeRepository extends MongoRepository<ResumeEntity, String> {
}
