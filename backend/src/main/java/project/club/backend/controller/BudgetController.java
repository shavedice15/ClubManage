package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;
import java.text.ParseException;
import java.time.LocalDate;
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
        return budgetRepository.getAllBudget();
    }

    @GetMapping("/findBudgetsByClub/{clubId}")
    public Collection<Budget> findBudgetsByClub(@PathVariable long clubId) {
        Club club = clubRepository.findById(clubId);
        return budgetRepository.findByClubOrderByDateDesc(club);
    }

    @GetMapping("/findByClubAndDate/{clubId}/{startDate}/{endDate}")
    public Collection<Budget> findByClubAndDate(@PathVariable long clubId,@PathVariable String startDate,
                                                    @PathVariable String endDate) throws ParseException{
        LocalDate dateStart = LocalDate.parse(startDate);
        LocalDate dateEnd = LocalDate.parse(endDate);
        Club club = clubRepository.findById(clubId);
        return budgetRepository.findByClubAndDate(club, dateStart, dateEnd);
    }

    @GetMapping("/findByDate/{startDate}/{endDate}")
    public Collection<Budget> findByDate(@PathVariable String startDate,
                                        @PathVariable String endDate) throws ParseException{
        LocalDate dateStart = LocalDate.parse(startDate);
        LocalDate dateEnd = LocalDate.parse(endDate);
        return budgetRepository.findByDate(dateStart, dateEnd);
    }

    @PostMapping("/shareMoney/{clubId}/{date}/{money}")
    public Budget ShareMoney(@PathVariable long clubId,@PathVariable String date,
                                        @PathVariable int money) throws ParseException{
        LocalDate dateStart = LocalDate.parse(date);
        Club club = clubRepository.findById(clubId);
        Budget budget = new Budget(club,money,0,dateStart,"งบประจำเทอม");
        return budgetRepository.save(budget);
    }

    @PostMapping("/saveBudget/{clubId}/{date}/{income}/{pay}/{detail}")
    public Budget saveBudget(@PathVariable long clubId,@PathVariable String date,
                                        @PathVariable int income,@PathVariable int pay,
                                        @PathVariable String detail) throws ParseException{
        LocalDate dateStart = LocalDate.parse(date);
        Club club = clubRepository.findById(clubId);
        Budget budget = new Budget(club,income,pay,dateStart,detail);
        return budgetRepository.save(budget);
    }
}