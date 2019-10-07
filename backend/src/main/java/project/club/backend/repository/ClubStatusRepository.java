package project.club.backend.repository;
import project.club.backend.entity.ClubStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubStatusRepository extends JpaRepository<ClubStatus,Long>{
    ClubStatus findById(long id);
}
