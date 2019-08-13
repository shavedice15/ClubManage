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
    public String getPorition(){
        return position;
    }
    
}