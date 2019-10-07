package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class ManageClubController {
    @Autowired private MemberClubRepository memberClubRepository;
    @Autowired private UsernameRepository usernameRepository;
    @Autowired private ClubRepository clubRepository;
    @Autowired private MemberStatusRepository memberStatusRepository;
    @Autowired private MemberRepository memberRepository;
    @Autowired private PositionRepository positionRepository;
    @Autowired private TypeClubRepository typeClubRepository;
    @Autowired private AdviserRepository adviserRepository;
    @Autowired private OrganizeRepository organizeRepository;
    @Autowired private OrPositionRepository orPositionRepository;
    @Autowired private ClubStatusRepository clubStatusRepository;

    @GetMapping("/username/{username}")
    public Username getUsername(@PathVariable String username) {
        Username user = usernameRepository.findByUsername(username);
        return user;
    }

    @GetMapping("/organize/{username}")
    public Organize getOrganize(@PathVariable String username) {
        Organize user = organizeRepository.findByUsername(username);
        return user;
    }

    @GetMapping("/orPositions")
    Collection<OrPosition> getOrPositions() {
        return orPositionRepository.findAll().stream()
                .collect(Collectors.toList());
    }

    @GetMapping("/organizes")
    Collection<Organize> getOrganize() {
        return organizeRepository.findAll().stream()
                .collect(Collectors.toList());
    }

    @GetMapping("/myClub/{username}") //ชมรมที่ฉันอยู่ทั้งหมด
    Collection<MemberClub> getUsernameClub(@PathVariable String username) {
        Username user = usernameRepository.findByUsername(username);
        Collection<MemberClub> memberClub = memberClubRepository.findByMember(user.getMember());
        return memberClub;
    }

    @GetMapping("/username/{username}/{password}") //login
    public Username getUser(@PathVariable String username, @PathVariable String password) {
        Username user = usernameRepository.findByUsernameAndPassword(username,password);
        return user;
    }

    @GetMapping("/memberClub/{clubId}") //แสดงสมาชิกชมรมทั้งหมด
    Collection<MemberClub> getMemberClub(@PathVariable long clubId) {
        Club club = clubRepository.findById(clubId);
        MemberStatus status = memberStatusRepository.findById(2);
        Collection<MemberClub> memberClub = memberClubRepository.findByClubAndMemberStatusOrderByPositionAsc(club,status);
        return memberClub;
    }

    @GetMapping("/acceptMemberClub/{clubId}") //แสดงสมาชิกที่ขอเข้าร่วมชมรม
    Collection<MemberClub> getMemberClubForAccept(@PathVariable long clubId) {
        Club club = clubRepository.findById(clubId);
        MemberStatus status = memberStatusRepository.findById(1);
        Collection<MemberClub> memberClub = memberClubRepository.findByClubAndMemberStatus(club,status);
        return memberClub;
    }

    @GetMapping("/findMyClub/{clubId}/{username}") //หาว่าอยู่ในชมรมนี้หรือยัง
    public MemberClub getFindMyClub(@PathVariable long clubId, @PathVariable String username) {
        Username user = usernameRepository.findByUsername(username);
        Club club = clubRepository.findById(clubId);
        MemberClub memberClub = memberClubRepository.findByClubAndMember(club,user.getMember());
        return memberClub;
    }

    @PutMapping("/editPosition/{clubId}/{memberId}/{positionId}") //เปลี่ยนตำแหน่งสมาชิก
    public MemberClub editPosition(@PathVariable long clubId, @PathVariable long memberId, @PathVariable long positionId) {
        Member member = memberRepository.findById(memberId);
        Club club = clubRepository.findById(clubId);
        Position position = positionRepository.findById(positionId);
        MemberClub memberClub = memberClubRepository.findByClubAndMember(club,member);
        memberClub.setPosition(position);
        return memberClubRepository.save(memberClub);
    }

    @DeleteMapping("/deleteMember/{id}") //ลบสมาชิกออกจากชมรม
    public ResponseEntity<?> deleteMemberClub(@PathVariable Long id) {
        memberClubRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/acceptMember/{memberClubId}") //รับสมาชิก
    public MemberClub acceptMember(@PathVariable long memberClubId) {
        MemberStatus status = memberStatusRepository.findById(2);
        MemberClub result = memberClubRepository.findById(memberClubId);
        result.setMemberStatus(status);
        return memberClubRepository.save(result);
    }

    @PutMapping("/updateClub/{clubId}/{clubName}/{pageFB}/{groupFB}/{invitation}/{typeId}/{adviserId}") //แก้ไขข้อมูลชมรม
    public Club updateClub(@PathVariable long clubId,@PathVariable String clubName,
                    @PathVariable String pageFB,@PathVariable String groupFB,
                    @PathVariable String invitation,@PathVariable long typeId,
                    @PathVariable long adviserId) {
        TypeClub type = typeClubRepository.findById(typeId);
        Adviser adviser = adviserRepository.findById(adviserId);
        Club findClub = clubRepository.findById(clubId);
        findClub.setClubName(clubName);
        findClub.setPageFB(pageFB);
        findClub.setGroupFB(groupFB);
        findClub.setInvitation(invitation);
        findClub.setTypeClub(type);
        findClub.setAdviser(adviser);
        return clubRepository.save(findClub);
    }

    @PutMapping("/updateTelOr/{username}/{tel}") //แก้ไขเบอร์องค์การบริหารอย่างเดียว
    public Organize updateTelOr(@PathVariable String username, @PathVariable String tel) {
        Organize organize = organizeRepository.findByUsername(username);
        organize.setTell(tel);
        return organizeRepository.save(organize);
    }

    @PutMapping("/updateTelAndPasswordOr/{username}/{tel}/{password}") //แก้ไขเบอร์และpasswordองค์การบริหาร
    public Organize updateTelAndPasswordOr(@PathVariable String username, @PathVariable String tel,
                                            @PathVariable String password) {
        Organize organize = organizeRepository.findByUsername(username);
        organize.setTell(tel);
        organize.setPassword(password);
        return organizeRepository.save(organize);
    }

    @DeleteMapping("/deleteOrganize/{id}") //ลบองค์การบริหาร
    public ResponseEntity<?> deleteOrganize(@PathVariable long id) {
        organizeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/addOrganize/{username}/{password}/{name}/{tel}/{grade}/{positionId}") //เพิ่มองค์การ
    public Organize addOrganize(@PathVariable String username,@PathVariable String password,
                                    @PathVariable String name,@PathVariable String tel,
                                    @PathVariable float grade,@PathVariable long positionId) {
                                      
        OrPosition position = orPositionRepository.findById(positionId);
        Organize organize = new Organize(username,password,name,tel,grade,position);  
        return organizeRepository.save(organize);
    }

    @DeleteMapping("/deleteClub/{id}") //ลบชมรม
    public ResponseEntity<?> deleteClub(@PathVariable Long id) {
        clubRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/acceptClub/{clubId}") //ยอมรับจัดตั้งชมรม
    public Club acceptClub(@PathVariable long clubId) {
        ClubStatus status = clubStatusRepository.findById(2);
        Club club = clubRepository.findById(clubId);
        club.setClubStatus(status);
        return clubRepository.save(club);
    }
}