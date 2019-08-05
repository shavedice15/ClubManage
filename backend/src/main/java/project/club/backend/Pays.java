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
@Table(name="Pays")


@SpringBootApplication
public class Pays {
	private @NonNull Long paysId;
	private @NonNull int pay;
	
	public Long getPaysId(){
		return paysId ;
	}

	public void setPaysId(Long paysId) {
        this.paysId = paysId;
	}
	
	public int getPay(){
		return pay ;
	}

	public void setPay(int pay) {
        this.pay = pay;
    }

	
}
