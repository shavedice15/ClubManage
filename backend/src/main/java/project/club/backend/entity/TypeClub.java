package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class TypeClub {
    @Id
    @SequenceGenerator(name = "typeClub_seq", sequenceName = "typeClub_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "typeClub_seq")
    @Column(name="TypeClub_ID")
    private @NonNull long id;

    private @NonNull String typeClub;

    public  TypeClub(){

    }
    public TypeClub(String typeClub){
        this.typeClub = typeClub;
    }

    public long getId() {
        return this.id;
    }

    public String getTypeClub() {
        return this.typeClub;
    }
    public void setTypeClub(String typeClub) {
        this.typeClub = typeClub;
    }
}