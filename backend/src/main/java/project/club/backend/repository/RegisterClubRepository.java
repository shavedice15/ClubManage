package project.club.backend.repository;
import project.club.backend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;




public interface RegisterClubRepository extends JpaRepository<RegisterClub, Long> {
    RegisterClub findById(long id);
}