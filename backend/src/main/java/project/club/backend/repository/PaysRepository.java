package project.club.backend.repository;
import project.club.backend.entity.Pays;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaysRepository extends JpaRepository <Pays,Long> {
    
}