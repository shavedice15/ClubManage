package project.club.backend.repository;
import project.club.backend.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClubRepository extends JpaRepository <Club,Long> {
    @Query(value = "SELECT c FROM Club c WHERE c.clubName LIKE %:clubName%")
    Collection<Club> findByClubName(@Param("clubName") String clubName);
}