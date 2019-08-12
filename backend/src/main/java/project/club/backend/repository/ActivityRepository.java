package project.club.backend.repository;
import project.club.backend.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository <Activity,Long> {
    
}