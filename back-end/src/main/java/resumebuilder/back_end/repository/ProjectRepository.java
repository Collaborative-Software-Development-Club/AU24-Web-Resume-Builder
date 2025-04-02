package resumebuilder.back_end.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import resumebuilder.back_end.domain.entities.ProjectEntity;

import java.util.List;

public interface ProjectRepository extends MongoRepository<ProjectEntity, String> {
    public List<ProjectEntity> findByUserId(String userId);
}
