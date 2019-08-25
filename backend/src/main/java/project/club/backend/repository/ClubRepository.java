package project.club.backend.repository;
import project.club.backend.entity.Club;
import project.club.backend.entity.TypeClub;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClubRepository extends JpaRepository <Club,Long> {
    @Query(value = "SELECT c FROM Club c WHERE c.clubName LIKE %:clubName%")
    Collection<Club> findByClubName(@Param("clubName") String clubName);
    
    Collection<Club> findByTypeClub(TypeClub type);

    @Query(value = "SELECT c FROM Club c WHERE c.clubName LIKE %:clubName% AND c.typeClub = :type")
    Collection<Club> findByClubNameAndTypeClub(@Param("clubName") String clubName, 
                                                @Param("type")TypeClub type);

    Club findById(long id);
}