package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class MemberStatus {
    @Id
    @SequenceGenerator(name = "MemberStatus_seq", sequenceName = "MemberStatus_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MemberStatus_seq")
    @Column(name="MemberStatus_ID")
    private @NonNull long id;

    private @NonNull String status;

    public MemberStatus(){}
    public MemberStatus (String status){
        this.status = status;
    }
    public long getId(){
        return id;
    }
    public void setStatus(String status){
        this.status = status;
    }
    public String getStatus(){
        return status;
    }
}