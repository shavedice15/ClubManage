package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class ManageClubController {
    @Autowired private MemberClubRepository memberClubRepository;
    @Autowired private UsernameRepository usernameRepository;

    @GetMapping("/username/{username}")
    public Username getUsername(@PathVariable String username) {
        Username user = usernameRepository.findByUsername(username);
        return user;
    }

    @GetMapping("/usernameClub/{username}")
    Collection<MemberClub> getUsernameClub(@PathVariable String username) {
        Username user = usernameRepository.findByUsername(username);
        return user.getMember().getMemberClub();
    }

    @GetMapping("/username/{username}/{password}")
    public Username getUser(@PathVariable String username, @PathVariable String password) {
        Username user = usernameRepository.findByUsernameAndPassword(username,password);
        return user;
    }
}