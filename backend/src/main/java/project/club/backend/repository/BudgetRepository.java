package project.club.backend.repository;
import project.club.backend.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.club.backend.entity.Club;

public interface BudgetRepository extends JpaRepository <Budget,Long> {

    @Query(value = "SELECT t FROM Budget t WHERE t.club = :club AND t.date BETWEEN :startDate AND :endDate ORDER BY t.date DESC")
    Collection<Budget> findByClubAndDate(@Param("club") Club club, @Param("startDate")LocalDate startDate, @Param("endDate")LocalDate endDate);

    @Query(value = "SELECT t FROM Budget t WHERE t.club = :club ORDER BY t.date DESC")
    Collection<Budget> findByClubOrderByDateDesc(@Param("club") Club club);

    @Query(value = "SELECT t FROM Budget t ORDER BY t.date DESC")
    Collection<Budget> getAllBudget();

    @Query(value = "SELECT t FROM Budget t WHERE t.date BETWEEN :startDate AND :endDate ORDER BY t.date DESC")
    Collection<Budget> findByDate(@Param("startDate")LocalDate startDate, @Param("endDate")LocalDate endDate);
}