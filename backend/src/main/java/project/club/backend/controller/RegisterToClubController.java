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

    @GetMapping("/memberStatus")
    Collection<MemberStatus> getMemberStatus() {
        return memberStatusRepository.findAll().stream()
                    .collect(Collectors.toList());
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
        return clubRepository.findByClubName(clubName);
    }

    @GetMapping("/findClubByType/{typeId}")
    Collection<Club> getFindClubbByType(@PathVariable long typeId) {
        TypeClub type = typeClubRepository.findById(typeId);
        return clubRepository.findByTypeClub(type);
    }

    @GetMapping("/findClubByNameAndType/{clubName}/{typeId}")
    Collection<Club> getFindClubByNameAndType(@PathVariable String clubName,@PathVariable long typeId) {
        TypeClub type = typeClubRepository.findById(typeId);
        return clubRepository.findByClubNameAndTypeClub(clubName, type);
    }

    @PostMapping("/regisToClub/{memberId}/{clubId}/{reason}")
    public Member regisToClub(@PathVariable long memberId,@PathVariable long clubId,
                                    @PathVariable String reason) {
        Rank rank = rankRepository.findById(2);
        Position position = positionRepository.findById(8);
        MemberStatus status = memberStatusRepository.findById(1);
        Member member = memberRepository.findById(memberId);
        Club club = clubRepository.findById(clubId);

        MemberClub memberClub = new MemberClub(reason,position,rank,status,club);
        memberClubRepository.save(memberClub);
        member.getMemberClub().add(memberClub);
        
        return memberRepository.save(member);
    }
}