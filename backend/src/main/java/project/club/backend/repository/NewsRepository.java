package project.club.backend.repository;
import project.club.backend.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Collection;

public interface NewsRepository extends JpaRepository<News,Long>{
    News findById(long id);

    @Query(value = "SELECT n FROM News n ORDER BY n.date DESC")
    Collection<News> findAllOrderByDate();
}
