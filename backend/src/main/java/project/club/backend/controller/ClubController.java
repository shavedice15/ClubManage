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


    
   ClubController(ClubRepository clubRepository,TypeClubRepository typeClubRepository,AdviserRepository adviserRepository,
   MajorRepository majorRepository){
        this.clubRepository = clubRepository;
        this.typeClubRepository = typeClubRepository;
        this.adviserRepository = adviserRepository;
        this.majorRepository = majorRepository;

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

//--------------------------------------------------------------------------------

@PostMapping("/clubx/{majorId}/{typeId}/{adviserId}")
    Club createClub(@Valid @RequestBody Club club,@PathVariable int majorId,
    @PathVariable int typeId,@PathVariable int adviserId) throws URISyntaxException {
        
        Major ma = majorRepository.findById(majorId);
        TypeClub ty = typeClubRepository.findById(typeId);
        Adviser ad = adviserRepository.findById(adviserId);

        club.setMajor(ma.getMajor());
        club.setTypeClubname(ty.getTypeClub());
        club.setAdvisername(ad.getName());
        
        log.info("Request to create member: {}", club);
        Club result = clubRepository.save(club);
        return result;
    }

    @DeleteMapping("/clubs/{id}")
    public ResponseEntity<?> deleteClub(@PathVariable Long id) {
        log.info("Request to delete club: {}", id);
        clubRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}