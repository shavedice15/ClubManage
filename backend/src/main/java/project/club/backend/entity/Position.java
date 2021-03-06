package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Position {
    @Id
    @SequenceGenerator(name = "Position_seq", sequenceName = "Position_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Position_seq")
    @Column(name="Position_ID")
    private @NonNull long id;

    private @NonNull String position;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Rank.class)
    @JoinColumn(name = "Rank_ID", insertable = true)
    private Rank rank;
    
    public Position(){}
    public Position (String position){
        this.position = position;
    }

    public long getId(){
        return id;
    }
    public void setPosition(String position){
        this.position = position;
    }
    public String getPosition(){
        return position;
    }

    public void setRank(Rank rank){
        this.rank = rank;
    }
    public Rank getRank(){
        return rank;
    }
    
}