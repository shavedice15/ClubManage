package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class IncomesController {
    @Autowired private final IncomesRepository incomesRepository;
    
   IncomesController(IncomesRepository incomesRepository){
        this.incomesRepository = incomesRepository;
    }

    @GetMapping("/Incomess")
    public Collection<Incomes> incomes() {
        return incomesRepository.findAll().stream()
                .collect(Collectors.toList());
    }

}