package project.club.backend.repository;
import project.club.backend.entity.OrPosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrPositionRepository extends JpaRepository<OrPosition,Long>{
    OrPosition findById(long id);
}
