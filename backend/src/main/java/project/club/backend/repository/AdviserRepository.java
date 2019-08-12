package project.club.backend.repository;
import project.club.backend.entity.Adviser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdviserRepository extends JpaRepository <Adviser,Long> {
    Adviser findById(long id);
}