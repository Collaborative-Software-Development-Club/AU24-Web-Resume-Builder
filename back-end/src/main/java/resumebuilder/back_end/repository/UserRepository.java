package resumebuilder.back_end.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import resumebuilder.back_end.domain.entities.UserEntity;

public interface UserRepository extends MongoRepository<UserEntity, String> {
}
