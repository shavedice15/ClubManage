package project.club.backend.controller;

import project.club.backend.entity.*;
import project.club.backend.repository.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
class MemberController {

    private final Logger log = LoggerFactory.getLogger(MemberController.class);
    private MemberRepository memberRepository;
    private MajorRepository majorRepository;
    private BranchRepository branchRepository;
    private ChangwatRepository changwatRepository;
    private AumphoeRepository aumphoeRepository;
    private UsernameRepository usernameRepository;

    //private RegisterClubRepository registerClubRepository;

    public MemberController(MemberRepository memberRepository,MajorRepository majorRepository,
                BranchRepository branchRepository, ChangwatRepository changwatRepository,AumphoeRepository aumphoeRepository,
                UsernameRepository usernameRepository

                /*RegisterClubRepository registerClubRepository*/ ) {
        this.memberRepository  = memberRepository;
        this.majorRepository = majorRepository;
        this.branchRepository = branchRepository;
        this.changwatRepository = changwatRepository;
        this.aumphoeRepository = aumphoeRepository;
        this.usernameRepository = usernameRepository;

        //this.registerClubRepository = registerClubRepository;
        
    }

    @GetMapping("/members")
    Collection<Member> members() {
        return memberRepository.findAll();
    }

    @GetMapping("/majors")
    Collection<Major> majors() {
        return majorRepository.findAll();
    }

    @GetMapping("/branchs")
    Collection<Branch> branchs() {
        return branchRepository.findAll();
    }

    @GetMapping("/aumphoes")
    Collection<Aumphoe> aumphoes() {
        return aumphoeRepository.findAll();
    }

    @GetMapping("/changwats")
    Collection<Changwat> changwats() {
        return changwatRepository.findAll();
    }

    //-------------------------------------------------------------------------

    @GetMapping("/findAumphoe/{changwatId}")
    Collection<Aumphoe> getAumphoe(@PathVariable long changwatId) {
          Changwat ch = changwatRepository.findById(changwatId);
         
 
        return aumphoeRepository.findByChangwatid(ch);
    }


    @GetMapping("/findBranch/{majorId}")
    Collection<Branch> getBranch(@PathVariable long majorId) {
          Major m = majorRepository.findById(majorId);
         
 
        return branchRepository.findByMajorid(m);
    }

    @GetMapping("/findMember/{memberid}")
    Member getMember(@PathVariable long memberid) {
          Member m = memberRepository.findById(memberid);
        return m;
    }
    

    @PostMapping("/memberx/{changwatId}/{aumphoeId}/{majorId}/{branchId}/{username}/{password}")
    Member createMember(@Valid @RequestBody Member member,@PathVariable int changwatId,
        @PathVariable int aumphoeId,@PathVariable int majorId,@PathVariable int branchId,
        @PathVariable String username,@PathVariable String password) throws URISyntaxException {

        Changwat ch = changwatRepository.findById(changwatId);
        Aumphoe am = aumphoeRepository.findById(aumphoeId);
        Major ma = majorRepository.findById(majorId);
        Branch br =branchRepository.findById(branchId);

        member.setChangwatid(ch);
        member.setAumphoeid(am);
        member.setMajorid(ma);
        member.setBranchid(br);
        member.setChangwatname(ch.getChangwat());
        member.setAumphoename(am.getAumphoe());
        member.setMajor(ma.getMajor());
        member.setBranch(br.getBranch());
        log.info("Request to create member: {}", member);
        Member result = memberRepository.save(member);

        Username user = new Username(username,password,result);
        usernameRepository.save(user);
        return result;
    }


    @PostMapping("/changwatx")
    Changwat createChangwat(@Valid @RequestBody Changwat changwat) throws URISyntaxException {
        log.info("Request to create changwat: {}", changwat);
        Changwat result = changwatRepository.save(changwat);
        return result;
    }
    

    @DeleteMapping("/member/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id) {
        log.info("Request to delete member: {}", id);
        memberRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/memberx/{changwatId}/{aumphoeId}/{majorId}/{branchId}")
    Member updateMember(@Valid @RequestBody Member member,@PathVariable int changwatId,
        @PathVariable int aumphoeId,@PathVariable int majorId,@PathVariable int branchId) {
        Changwat ch = changwatRepository.findById(changwatId);
        Aumphoe am = aumphoeRepository.findById(aumphoeId);
        Major ma = majorRepository.findById(majorId);
        Branch br =branchRepository.findById(branchId);
        
        member.setChangwatid(ch);
        member.setAumphoeid(am);
        member.setMajorid(ma);
        member.setBranchid(br);

        member.setChangwatname(ch.getChangwat());
        member.setAumphoename(am.getAumphoe());
        member.setMajor(ma.getMajor());
        member.setBranch(br.getBranch());
        log.info("Request to update member: {}", member);
        Member result = memberRepository.save(member);
        return result;
    }

}