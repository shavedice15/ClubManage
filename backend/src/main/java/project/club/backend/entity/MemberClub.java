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

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Rank.class)
    @JoinColumn(name = "Rank_ID", insertable = true)
    private Rank rank;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = MemberStatus.class)
    @JoinColumn(name = "MemberStatus_ID", insertable = true)
    private MemberStatus memberStatus;

    public MemberClub (String reason, Position position, Rank rank, MemberStatus memberStatus){
        this.reason = reason;
        this.position = position;
        this.rank = rank;
        this.memberStatus = memberStatus;
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

    public void setRank(Rank rank){
        this.rank = rank;
    }
    public Rank getRank(){
        return rank;
    }

    public void setMemberStatus(MemberStatus memberStatus){
        this.memberStatus = memberStatus;
    }
    public MemberStatus getMemberStatus(){
        return memberStatus;
    }
}