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

   

    public MemberController(MemberRepository memberRepository,MajorRepository majorRepository,
                BranchRepository branchRepository, ChangwatRepository changwatRepository,AumphoeRepository aumphoeRepository 
         ) {
        this.memberRepository  = memberRepository;
        this.majorRepository = majorRepository;
        this.branchRepository = branchRepository;
        this.changwatRepository = changwatRepository;
        this.aumphoeRepository = aumphoeRepository;
      
        
    }

    @GetMapping("/members")
    Collection<Member> members() {
        return memberRepository.findAll();
    }
}