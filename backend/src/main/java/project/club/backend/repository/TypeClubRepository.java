package project.club.backend.repository;
import project.club.backend.entity.TypeClub;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeClubRepository extends JpaRepository <TypeClub,Long> {
    TypeClub findById(long id);
}