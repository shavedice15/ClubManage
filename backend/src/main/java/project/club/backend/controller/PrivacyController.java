package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class PrivacyController {
    @Autowired private final PrivacyRepository privacyRepository;
    
   PrivacyController(PrivacyRepository privacyRepository){
        this.privacyRepository = privacyRepository;
    }

    @GetMapping("/Privacys")
    public Collection<Privacy> privacys() {
        return privacyRepository.findAll().stream()
                .collect(Collectors.toList());
    }

}