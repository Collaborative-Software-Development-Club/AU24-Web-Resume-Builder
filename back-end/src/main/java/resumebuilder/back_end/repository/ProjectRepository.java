package resumebuilder.back_end.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import resumebuilder.back_end.domain.entities.ProjectEntity;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<ProjectEntity, String> {
    public List<ProjectEntity> findByUserId(String userId);
}
