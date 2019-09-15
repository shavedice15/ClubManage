package project.club.backend.repository;
import project.club.backend.entity.Privacy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivacyRepository extends JpaRepository <Privacy,Long> {
    Privacy findById(long id);
}