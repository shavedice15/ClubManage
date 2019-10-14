package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Collection;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
class ClubController {

    private final Logger log = LoggerFactory.getLogger(ClubController.class);
    @Autowired private final ClubRepository clubRepository;

    private MajorRepository majorRepository;
    private TypeClubRepository typeClubRepository;
    private AdviserRepository adviserRepository;
    private ClubStatusRepository clubStatusRepository;
    private MemberRepository memberRepository;
    private MemberClubRepository memberClubRepository;
    private PositionRepository positionRepository;
    private MemberStatusRepository memberStatusRepository;

   ClubController(ClubRepository clubRepository,TypeClubRepository typeClubRepository,AdviserRepository adviserRepository,
   MajorRepository majorRepository , ClubStatusRepository clubStatusRepository, MemberRepository memberRepository,
   MemberClubRepository memberClubRepository, PositionRepository positionRepository,MemberStatusRepository memberStatusRepository){
        this.clubRepository = clubRepository;
        this.typeClubRepository = typeClubRepository;
        this.adviserRepository = adviserRepository;
        this.majorRepository = majorRepository;
        this.clubStatusRepository = clubStatusRepository;
        this.memberRepository = memberRepository;
        this.memberClubRepository = memberClubRepository;
        this.positionRepository = positionRepository;
        this.memberStatusRepository = memberStatusRepository;
    }

    @GetMapping("/clubs")
    Collection<Club> clubs() {
        return clubRepository.findAll();
    }


    @GetMapping("/types")
    Collection<TypeClub> typeclubs() {
        return typeClubRepository.findAll();
    }


    @GetMapping("/advisers")
    Collection<Adviser> advisers() {
        return adviserRepository.findAll();
    }

    @GetMapping("/advisers/{id}")
    Adviser advisersID(@PathVariable long id) {
        return adviserRepository.findById(id);
    }

//--------------------------------------------------------------------------------

@PostMapping("/newClub/{majorId}/{typeId}/{adviserId}/{memberId}")
    Club createClub(@Valid @RequestBody Club club,@PathVariable int majorId,
    @PathVariable int typeId,@PathVariable int adviserId,@PathVariable long memberId) throws URISyntaxException {
        Member member = memberRepository.findById(memberId);
        Position position = positionRepository.findById(1);
        MemberStatus status = memberStatusRepository.findById(2);
        Major ma = majorRepository.findById(majorId);
        TypeClub ty = typeClubRepository.findById(typeId);
        Adviser ad = adviserRepository.findById(adviserId);
        club.setMajorid(ma);
        club.setTypeClub(ty);
        club.setAdviser(ad);

        club.setMajor(ma.getMajor());
        club.setTypeClubname(ty.getTypeClub());
        club.setAdvisername(ad.getName());
        club.setClubStatus(clubStatusRepository.findById(1L));
        log.info("Request to create member: {}", club);
        Club result = clubRepository.save(club);

        MemberClub memberClub = new MemberClub("",position,status,club,member);
        memberClubRepository.save(memberClub);

        return result;
    }

    @DeleteMapping("/clubs/{id}")
    public ResponseEntity<?> deleteClub(@PathVariable Long id) {
        log.info("Request to delete club: {}", id);
        clubRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/findClub/{clubid}")
    Club getClub(@PathVariable long clubid) {
          Club club = clubRepository.findById(clubid);
        return club;
    }

    @PutMapping("/clubx/{majorId}/{typeId}/{adviserId}")
    Club updateClub(@Valid @RequestBody Club club,@PathVariable int majorId,
    @PathVariable int typeId,@PathVariable int adviserId) throws URISyntaxException {
        
        Major ma = majorRepository.findById(majorId);
        TypeClub ty = typeClubRepository.findById(typeId);
        Adviser ad = adviserRepository.findById(adviserId);

        club.setMajorid(ma);
        club.setTypeClub(ty);
        club.setAdviser(ad);
        club.setMajor(ma.getMajor());
        club.setTypeClubname(ty.getTypeClub());
        club.setAdvisername(ad.getName());
        club.setClubStatus(clubStatusRepository.findById(1L));
        log.info("Request to create member: {}", club);
        Club result = clubRepository.save(club);
        return result;
    }




}