package project.club.backend.repository;
import project.club.backend.entity.MemberClub;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberClubRepository extends JpaRepository <MemberClub,Long> {
    MemberClub findById(long id);
}