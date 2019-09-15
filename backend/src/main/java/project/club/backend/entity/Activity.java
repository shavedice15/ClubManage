package project.club.backend.entity;
import lombok.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
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

	@JsonFormat(pattern="dd-MM-yyyy")
	private @NonNull LocalDate dateStart;

	@JsonFormat(pattern="dd-MM-yyyy")
	private @NonNull LocalDate dateEnd;

	private @NonNull String detail;

	public Activity(){}
	public Activity (Club club,Privacy privacy, String activityName, LocalDate dateStart,
					 LocalDate dateEnd, String detail){
		this.club = club;
		this.privacy = privacy;
		this.activityName = activityName;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.detail = detail;
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
	
	public  LocalDate getDateStart(){
		return dateStart ;
	}

	public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
	}
	
	public  LocalDate getDateEnd(){
		return dateEnd ;
	}

	public void setDateEnd(LocalDate dateEnd) {
        this.dateEnd = dateEnd;
    }

	public  String getDetail(){
		return detail ;
	}

	public void setDetail(String detail) {
        this.detail = detail;
	}

	public void setPrivacy(Privacy privacy){
		this.privacy = privacy;
	}

	public Privacy getPrivacy(){
		return privacy;
	}
	
	public void setClub(Club club){
		this.club = club;
	}

	public Club getClub(){
		return club;
	}
}
