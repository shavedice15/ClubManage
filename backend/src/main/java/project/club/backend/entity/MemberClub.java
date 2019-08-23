package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class MemberClub {
    @Id
    @SequenceGenerator(name = "memberClub_seq", sequenceName = "memberClub_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "memberClub_seq")
    @Column(name="MemberClub_ID")
    private @NonNull long id;

    private @NonNull String reason;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Position.class)
    @JoinColumn(name = "Position_ID", insertable = true)
    private Position position;

    

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = MemberStatus.class)
    @JoinColumn(name = "MemberStatus_ID", insertable = true)
    private MemberStatus memberStatus;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Club.class)
    @JoinColumn(name = "Club_ID", insertable = true)
    private Club club;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Member.class)
    @JoinColumn(name = "Member_ID", insertable = true)
    private Member member;

    public MemberClub(){}
    public MemberClub (String reason, Position position, MemberStatus memberStatus, Club club,
                        Member member){
        this.reason = reason;
        this.position = position;
        this.memberStatus = memberStatus;
        this.club = club;
        this.member = member;
    }
    public long getId(){
        return id;
    }

    public void setReason(String reason){
        this.reason = reason;
    }
    public String getReason(){
        return reason;
    }

    public void setPosition(Position position){
        this.position = position;
    }
    public Position getPosition(){
        return position;
    }

    public void setMemberStatus(MemberStatus memberStatus){
        this.memberStatus = memberStatus;
    }
    public MemberStatus getMemberStatus(){
        return memberStatus;
    }

    public Club getClub() {
        return this.club;
    }
    public void setClub(Club club) {
        this.club = club;
    }

    public Member getMember() {
        return this.member;
    }
    public void setMember(Member member) {
        this.member = member;
    }
}