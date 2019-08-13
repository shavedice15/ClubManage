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


public class Activity {

	@Id
    @SequenceGenerator(name = "activity_seq", sequenceName = "activity_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "activity_seq")
    @Column(name="Activity_ID")
	private @NonNull Long activityId;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Club.class)
    @JoinColumn(name = "Club_ID", insertable = true)
	private Club club;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Privacy.class)
    @JoinColumn(name = "Privacy_ID", insertable = true)
	private Privacy privacy;

	private @NonNull String activityName;
	private @NonNull Date dateAc;
	private @NonNull Date dateEnd;
	private @NonNull Time time;
	private @NonNull Time timeEnd;
	private @NonNull String detail;

	public Activity(){}
	public Activity (Club club,Privacy privacy){
		this.club = club;
		this.privacy = privacy;
    }

	
	public Long getActivityId(){
		return activityId ;
	}

	public void setActivityId(Long activityId) {
        this.activityId = activityId;
	}
	
	public  String getActivityName(){
		return activityName ;
	}

	public void setActivityName(String activityName) {
        this.activityName = activityName;
	}
	
	public  Date getDateAc(){
		return dateAc ;
	}

	public void setDateAc(Date dateAc) {
        this.dateAc = dateAc;
	}
	
	public  Date getDateEnd(){
		return dateEnd ;
	}

	public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }


	
}
