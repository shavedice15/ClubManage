package project.club.backend.repository;
import project.club.backend.entity.Organize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizeRepository extends JpaRepository<Organize,Long>{
    Organize findByUsername(String username);
}
