package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class BudgetController {
    @Autowired private final BudgetRepository budgetRepository;
    @Autowired private ClubRepository clubRepository;
    
   BudgetController(BudgetRepository budgetRepository){
        this.budgetRepository = budgetRepository;
    }

    @GetMapping("/Budgets")
    public Collection<Budget> budgets() {
        return budgetRepository.findAll().stream()
                .collect(Collectors.toList());
    }

    @GetMapping("/findBudgetsByClub/{clubId}")
    public Collection<Budget> findBudgetsByClub(@PathVariable long clubId) {
        Club club = clubRepository.findById(clubId);
        return budgetRepository.findByClub(club);
    }

    @GetMapping("/findByClubAndDate/{clubId}/{startDate}/{endDate}")
    public Collection<Budget> findByClubAndDate(@PathVariable long clubId,@PathVariable String startDate,
                                                    @PathVariable String endDate) throws ParseException{
        Date dateStart = new SimpleDateFormat("yyyy-MM-dd").parse(startDate);
        Date dateEnd = new SimpleDateFormat("yyyy-MM-dd").parse(endDate);
        Club club = clubRepository.findById(clubId);
        return budgetRepository.findByClubAndDate(club, dateStart, dateEnd);
    }
}