package project.club.backend.repository;
import project.club.backend.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import java.util.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.club.backend.entity.Club;

public interface BudgetRepository extends JpaRepository <Budget,Long> {

    @Query(value = "SELECT t FROM Budget t WHERE t.club = :club AND t.date BETWEEN :startDate AND :endDate")
    Collection<Budget> findByClubAndDate(@Param("club") Club club, @Param("startDate")Date startDate, @Param("endDate")Date endDate);

    Collection<Budget> findByClub(Club club);

    @Query(value = "SELECT t FROM Budget t WHERE t.date BETWEEN :startDate AND :endDate")
    Collection<Budget> findByDate(@Param("startDate")Date startDate, @Param("endDate")Date endDate);
}