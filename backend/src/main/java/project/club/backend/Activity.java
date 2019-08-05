package project.club.backend.entity;

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
@Table(name="Activity")


@SpringBootApplication
public class Activity {
	private @NonNull Long activityId;
	private @NonNull String activityName;
	//private @NonNull Date dateAc;
	//private @NonNull Date dateEnd;
	//private @NonNull Time time;
	//private @NonNull Time timeEnd;
	private @NonNull String detail;

	
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
	
/*	public  Date getDateAc(){
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
    }*/


	
}
