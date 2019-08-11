package project.club.backend.entity;
import lombok.*;

import java.sql.Time;
import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.*;
//import org.hibernate.AnnotationException;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
//@Table(name="Activity")


public class Club {

	@Id
    @SequenceGenerator(name = "club_seq", sequenceName = "club_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "club_seq")
    @Column(name="Club_ID")
	private @NonNull Long clubId;
	private @NonNull String clubName;
	

	public Long getClubId(){
		return clubId ;
	}

	public void setClubId(Long clubId) {
        this.clubId = clubId;
	}
    
    public String getClubName(){
		return clubName ;
	}

	public void setClubName(String clubName) {
        this.clubName = clubName;
	}
	

	
}
