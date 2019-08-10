package project.club.backend.repository;
import project.club.backend.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankRepository extends JpaRepository<Rank, Long>{
    Rank findById(long id);
}