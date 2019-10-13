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
    @Autowired private MemberClubRepository memberClubRepository;
    @Autowired private MemberStatusRepository memberStatusRepository;
    @Autowired private PositionRepository positionRepository;
    @Autowired private RankRepository rankRepository;
    @Autowired private ClubRepository clubRepository;
    @Autowired private TypeClubRepository typeClubRepository;
    @Autowired private MemberRepository memberRepository;
    @Autowired private ClubStatusRepository clubStatusRepository;

    @GetMapping("/memberStatus")
    Collection<MemberStatus> getMemberStatus() {
        return memberStatusRepository.findAll().stream()
                    .collect(Collectors.toList());
    }

    @GetMapping("/clubConfirm")
    Collection<Club> clubConfirm() {
        return clubRepository.findByClubStatus(clubStatusRepository.findById(2));
    }

    @GetMapping("/clubNoConfirm")
    Collection<Club> clubNoConfirm() {
        return clubRepository.findClubNotAccept();
        //return clubRepository.findByClubStatus(clubStatusRepository.findById(1));
    }

    @GetMapping("/position")
    Collection<Position> getPosition() {
        return positionRepository.findAll().stream()
                    .collect(Collectors.toList());
    }

    @GetMapping("/rank")
    Collection<Rank> getRank() {
        return rankRepository.findAll().stream()
                    .collect(Collectors.toList());
    }

    @GetMapping("/typeClub")
    Collection<TypeClub> getTypeClub() {
        return typeClubRepository.findAll().stream()
                    .collect(Collectors.toList());
    }

    @GetMapping("/findClub/{clubId}")
    public Club getClub(@PathVariable long clubId) {
        Club club = clubRepository.findById(clubId);
        return club;
    }

    @GetMapping("/findClubByName/{clubName}")
    Collection<Club> getFindClubByName(@PathVariable String clubName) {
        return clubRepository.findByClubName(clubName,clubStatusRepository.findById(2));
    }

    @GetMapping("/findClubByType/{typeId}")
    Collection<Club> getFindClubbByType(@PathVariable long typeId) {
        TypeClub type = typeClubRepository.findById(typeId);
        return clubRepository.findByTypeClub(type,clubStatusRepository.findById(2));
    }

    @GetMapping("/findClubByNameAndType/{clubName}/{typeId}")
    Collection<Club> getFindClubByNameAndType(@PathVariable String clubName,@PathVariable long typeId) {
        TypeClub type = typeClubRepository.findById(typeId);
        return clubRepository.findByClubNameAndTypeClub(clubName, type, clubStatusRepository.findById(2));
    }

    @PostMapping("/regisToClub/{memberId}/{clubId}/{reason}") //สมัครเข้าชมรม
    public MemberClub regisToClub(@PathVariable long memberId,@PathVariable long clubId,
                                    @PathVariable String reason) {
        Position position = positionRepository.findById(8);
        MemberStatus status = memberStatusRepository.findById(1);
        Member member = memberRepository.findById(memberId);
        Club club = clubRepository.findById(clubId);

        MemberClub memberClub = new MemberClub(reason,position,status,club,member);
        
        return memberClubRepository.save(memberClub);
    }
}