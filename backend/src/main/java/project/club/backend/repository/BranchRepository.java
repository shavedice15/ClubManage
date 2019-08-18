package project.club.backend.repository;
import project.club.backend.entity.*;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;



public interface BranchRepository extends JpaRepository<Branch, Long> {
    Branch findById(long id);

    Collection<Branch> findByMajorid(Major id);
}