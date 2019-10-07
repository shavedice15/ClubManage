package project.club.backend.entity;

import lombok.*;
import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Club {
	@Id
	@SequenceGenerator(name = "club_seq", sequenceName = "club_seq")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "club_seq")
	@Column(name = "Club_ID")
	private @NonNull Long clubId;

	private @NonNull String clubName;
	private String studentid;
	private String studentname;
	private String grad;
	private String tell;
	private String objective;
	private String activites;

	private @NonNull String pageFB;

	private @NonNull String invitation;

	private @NonNull String groupFB;
	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Adviser.class)
	@JoinColumn(name = "Adviser_ID", insertable = true)
	private Adviser adviser;
	private String advisername;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = TypeClub.class)
	@JoinColumn(name = "TypeClub_ID", insertable = true)
	private TypeClub typeClub;
	private String typeClubname;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = ClubStatus.class)
	@JoinColumn(name = "ClubStatus_ID", insertable = true)
	private ClubStatus clubStatus;

	@OneToOne(fetch = FetchType.EAGER, targetEntity = Major.class)
	@JoinColumn(name = "Major_ID", insertable = true)
	private Major majorid;
	private String major;

	public Club() {
	}

	public Club(String clubName, String groupFB, String pageFB, String invitation, Adviser adviser,
			TypeClub typeClub, ClubStatus clubStatus) {
		this.clubName = clubName;
		this.groupFB = groupFB;
		this.pageFB = pageFB;
		this.invitation = invitation;
		this.adviser = adviser;
		this.typeClub = typeClub;
		this.clubStatus = clubStatus;
	}

	public Long getClubId() {
		return clubId;
	}

	public void setClubId(Long clubId) {
		this.clubId = clubId;
	}

	public String getClubName() {
		return clubName;
	}

	public void setClubName(String clubName) {
		this.clubName = clubName;
	}

	public String getGroupFB() {
		return this.groupFB;
	}

	public void setGroupFB(String groupFB) {
		this.groupFB = groupFB;
	}

	public String getPageFB() {
		return this.pageFB;
	}

	public void setPageFB(String pageFB) {
		this.pageFB = pageFB;
	}

	public String getInvitation() {
		return this.invitation;
	}

	public void setInvitation(String invitation) {
		this.invitation = invitation;
	}

	public Adviser getAdviser() {
		return adviser;
	}

	public void setAdviser(Adviser adviser) {
		this.adviser = adviser;
	}

	public TypeClub getTypeClub() {
		return typeClub;
	}

	public void setTypeClub(TypeClub typeClub) {
		this.typeClub = typeClub;
	}
//---------------------------------------------------------------------------
	
	public void setTypeClubname(String typeclub) {
		this.typeClubname = typeclub;
	}

	public String getTypeClubname() {
		return typeClubname;
	}

	public void setStudentid(String id){
		this.studentid = id;
	}

	public String getStudentid(){return studentid;}
	public void setStudentname(String name){
		this.studentname = name;
	}
	public String getStudentname(){return studentname;}
	public void setGrad(String grad){this.grad=grad;}
	public String getGrad(){return grad;}
	public void setTell(String tell){
		this.tell = tell;
	}
	public String  getTell(){return tell;}
	public void setObjective(String objective){
		this.objective = objective;
	}
	public String getObjective(){return objective;}
	public void setActivities(String activities){this.activites = activities;}
	public String getActivities(){return activites;}

	public void setMajorid(Major major){
		this.majorid = major;
	}
	public Major getMajorid(){return majorid;}
	public void setMajor(String name){this.major = name;}
	public String getMajor(){return major;}
	public void setAdvisername(String name){this.advisername = name;}
	public String getAdvisername(){return advisername;}
//---------------------------------------------------------------------------
	public ClubStatus getClubStatus() {
		return clubStatus;
	}

	public void setClubStatus(ClubStatus clubStatus) {
		this.clubStatus = clubStatus;
	}
}
