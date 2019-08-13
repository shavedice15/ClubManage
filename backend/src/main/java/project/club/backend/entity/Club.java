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
    @Column(name="Club_ID")
	private @NonNull Long clubId;

	private @NonNull String clubName;
	private @NonNull String groupFB;
	private @NonNull String pageFB;
	private @NonNull String invitation;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Adviser.class)
    @JoinColumn(name = "Adviser_ID", insertable = true)
	private Adviser adviser;
	
	@ManyToOne(fetch = FetchType.EAGER, targetEntity = TypeClub.class)
    @JoinColumn(name = "TypeClub_ID", insertable = true)
	private TypeClub typeClub;
	
	public Club (){}

	public Club (String clubName, String groupFB, String pageFB, String invitation,Adviser adviser, 
					TypeClub typeClub){
		this.clubName = clubName;
		this.groupFB  = groupFB;
		this.pageFB = pageFB;
		this.invitation = invitation;
		this.adviser = adviser;
		this.typeClub = typeClub;
	}

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
	
	public Adviser getAdviser(){
		return adviser ;
	}

	public void setAdviser(Adviser adviser) {
        this.adviser = adviser;
	}

	public TypeClub getTypeClub(){
		return typeClub ;
	}

	public void setTypeClub(TypeClub typeClub){
        this.typeClub = typeClub;
	}

	
}
