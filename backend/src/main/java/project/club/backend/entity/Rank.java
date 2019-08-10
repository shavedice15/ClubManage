package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Rank {
    @Id
    @SequenceGenerator(name = "Rank_seq", sequenceName = "Rank_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Rank_seq")
    @Column(name="Rank_ID")
    private @NonNull long id;

    private @NonNull String rank;

    public Rank (String rank){
        this.rank = rank;
    }

    public long getId() {
        return id;
    }
    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getRank() {
    	return rank;
    }

}