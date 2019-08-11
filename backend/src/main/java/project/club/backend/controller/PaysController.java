package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class PaysController {
    @Autowired private final PaysRepository paysRepository;
    
   PaysController(PaysRepository paysRepository){
        this.paysRepository = paysRepository;
    }

    @GetMapping("/Payss")
    public Collection<Pays> pays() {
        return paysRepository.findAll().stream()
                .collect(Collectors.toList());
    }

}