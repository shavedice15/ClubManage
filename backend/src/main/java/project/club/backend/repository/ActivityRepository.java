package project.club.backend.repository;
import project.club.backend.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import project.club.backend.entity.Club;
import project.club.backend.entity.Privacy;
import java.util.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityRepository extends JpaRepository <Activity,Long> {
    Activity findById(long id);

    @Query(value = "SELECT t FROM Activity t ORDER BY t.dateStart DESC")
    Collection<Activity> getAllActivity();

    @Query(value = "SELECT t FROM Activity t WHERE t.club = :club ORDER BY t.dateStart DESC")
    Collection<Activity> findByClubOrderByStartDateDesc(@Param("club") Club club);

    @Query(value = "SELECT t FROM Activity t WHERE t.privacy = :privacy ORDER BY t.dateStart DESC")
    Collection<Activity> findByPrivacyOrderByStartDateDesc(@Param("privacy") Privacy privacy);

    @Query(value = "SELECT t FROM Activity t WHERE t.club = :club AND t.privacy = :privacy ORDER BY t.dateStart DESC")
    Collection<Activity> findByClubAndPrivacy(@Param("club") Club club,@Param("privacy") Privacy privacy);
}