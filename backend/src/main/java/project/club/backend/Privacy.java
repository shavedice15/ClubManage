package project.club.backend.entity;



//import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Data
@Entity
@Getter @Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="Privacy")


@SpringBootApplication
public class Privacy {
	private @NonNull Long privacyId;
	private @NonNull String status;
	
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
