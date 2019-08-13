package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
//@Table(name="Privacy")


public class Privacy {
	@Id
    @SequenceGenerator(name = "incomes_seq", sequenceName = "incomes_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "incomes_seq")
    @Column(name="Incomes_ID")
	private @NonNull Long privacyId;
	private @NonNull String status;
	
	public Privacy (){}
	public Long getPrivacyId(){
		return privacyId ;
	}

	public void setPrivacyId(Long privacyId) {
        this.privacyId = privacyId;
	}
	
	public String getStatus(){
		return status ;
	}

	public void setStatus(String status) {
        this.status = status;
    }

	
}
