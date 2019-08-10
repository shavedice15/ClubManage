package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class RegisterToClubController {
    @Autowired private final MemberClubRepository memberClubRepository;
    @Autowired private MemberStatusRepository memberStatusRepository;
    @Autowired private PositionRepository positionRepository;
    @Autowired private RankRepository rankRepository;
    
    @Autowired
    RegisterToClubController(MemberClubRepository memberClubRepository) {
        this.memberClubRepository = memberClubRepository;
    }

    @GetMapping("/memberStatus")
    Collection<MemberStatus> getMemberStatus() {
        return memberStatusRepository.findAll();
    }

    @GetMapping("/position")
    Collection<Position> getPosition() {
        return positionRepository.findAll();
    }

    @GetMapping("/rank")
    Collection<Rank> getRank() {
        return rankRepository.findAll();
    }

}