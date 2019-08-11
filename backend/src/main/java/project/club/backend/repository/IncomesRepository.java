package project.club.backend.repository;
import project.club.backend.entity.Incomes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomesRepository extends JpaRepository <Incomes,Long> {
    
}