package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class ClubStatus {
    @Id
	@SequenceGenerator(name = "ClubStatus_seq", sequenceName = "ClubStatus_seq")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ClubStatus_seq")
	@Column(name = "ClubStatus_ID")
    private @NonNull long id;
    
    private String status;


    public ClubStatus(){}

    public ClubStatus(String status){
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

}