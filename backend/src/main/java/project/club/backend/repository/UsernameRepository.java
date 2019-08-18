package project.club.backend.repository;
import project.club.backend.entity.Username;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsernameRepository extends JpaRepository <Username,Long> {
    Username findByUsername(String username);
}