package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Privacy {
	@Id
    @SequenceGenerator(name = "privacy_seq", sequenceName = "privacy_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "privacy_seq")
    @Column(name="privacy_ID")
	private @NonNull Long privacyId;
	private @NonNull String status;
	
	public Privacy (){}

	public Privacy (String status){
		this.status = status;
	}

	public Long getPrivacyId(){
		return privacyId ;
	}

	public void setPrivacyId(Long privacyId) {
        this.privacyId = privacyId;
	}
	
	public String getStatus(){
		return status;
	}

	public void setStatus(String status) {
        this.status = status;
    }

	
}
