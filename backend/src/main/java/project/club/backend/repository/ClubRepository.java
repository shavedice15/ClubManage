package project.club.backend.repository;
import project.club.backend.entity.Club;;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository <Club,Long> {
    
}