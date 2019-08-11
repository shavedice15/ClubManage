package com.example.demo.repository;
import project.club.backend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface AumphoeRepository extends JpaRepository<Aumphoe, Long> {
    Aumphoe findById(long id);
}