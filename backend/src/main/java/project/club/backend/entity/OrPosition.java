package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class OrPosition {
    @Id
    @SequenceGenerator(name = "OrPosition_seq", sequenceName = "OrPosition_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "OrPosition_seq")
    @Column(name="OrPosition_ID")
    private @NonNull long id;

    private @NonNull String position;
    
    public OrPosition(){}
    public OrPosition (String position){
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
    
}