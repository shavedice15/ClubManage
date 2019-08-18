package project.club.backend.repository;
import project.club.backend.entity.Username;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsernameRepository extends JpaRepository <Username,Long> {
    Username findByUsername(String username);

    @Query(value = "SELECT u FROM Username u WHERE u.username = :username  AND u.password = :password")
    Username findByUsernameAndPassword(@Param("username")String username, 
                                        @Param("password")String password);
}