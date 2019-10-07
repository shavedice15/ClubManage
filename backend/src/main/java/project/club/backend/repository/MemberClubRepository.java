package project.club.backend.repository;
import project.club.backend.entity.MemberClub;
import project.club.backend.entity.Club;
import project.club.backend.entity.Member;
import project.club.backend.entity.Position;
import project.club.backend.entity.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;

public interface MemberClubRepository extends JpaRepository <MemberClub,Long> {
    MemberClub findById(long id);
    Collection<MemberClub> findByClubAndMemberStatus(Club club, MemberStatus status);
    Collection<MemberClub> findByClubAndMemberStatusOrderByPositionAsc(Club club, MemberStatus status);
    Collection<MemberClub> findByMember(Member member);

    MemberClub findByClubAndPosition(Club club,Position position);
    MemberClub findByClubAndMember(Club club, Member member);
}