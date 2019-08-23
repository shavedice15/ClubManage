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
    @Autowired private ClubRepository clubRepository;
    @Autowired private MemberStatusRepository memberStatusRepository;

    @GetMapping("/username/{username}")
    public Username getUsername(@PathVariable String username) {
        Username user = usernameRepository.findByUsername(username);
        return user;
    }

    @GetMapping("/myClub/{username}")
    Collection<MemberClub> getUsernameClub(@PathVariable String username) {
        Username user = usernameRepository.findByUsername(username);
        Collection<MemberClub> memberClub = memberClubRepository.findByMember(user.getMember());
        return memberClub;
    }

    @GetMapping("/username/{username}/{password}")
    public Username getUser(@PathVariable String username, @PathVariable String password) {
        Username user = usernameRepository.findByUsernameAndPassword(username,password);
        return user;
    }

    @GetMapping("/memberClub/{clubId}")
    Collection<MemberClub> getMemberClub(@PathVariable long clubId) {
        Club club = clubRepository.findById(clubId);
        MemberStatus status = memberStatusRepository.findById(2);
        Collection<MemberClub> memberClub = memberClubRepository.findByClubAndMemberStatus(club,status);
        return memberClub;
    }

    @GetMapping("/acceptMemberClub/{clubId}")
    Collection<MemberClub> getMemberClubForAccept(@PathVariable long clubId) {
        Club club = clubRepository.findById(clubId);
        MemberStatus status = memberStatusRepository.findById(1);
        Collection<MemberClub> memberClub = memberClubRepository.findByClubAndMemberStatus(club,status);
        return memberClub;
    }
}