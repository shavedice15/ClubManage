package project.club.backend.repository;
import project.club.backend.entity.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberStatusRepository extends JpaRepository<MemberStatus,Long>{
    MemberStatus findById(long id);
}
