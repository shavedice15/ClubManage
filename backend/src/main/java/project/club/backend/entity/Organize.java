package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Organize {
    @Id
    @SequenceGenerator(name = "Organize_seq", sequenceName = "Organize_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Organize_seq")
    @Column(name="Organize_ID")
    private @NonNull long id;

    private @NonNull String username;
    private @NonNull String password;
    private @NonNull String name;
    private @NonNull String tell;
    private @NonNull float grade;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = OrPosition.class)
    @JoinColumn(name = "OrPosition_ID", insertable = true)
    private OrPosition position;
    
    public Organize(){}
    public Organize (String username, String password, String name, String tell, float grade, OrPosition position){
        this.username = username;
        this.password = password;
        this.name = name;
        this.tell = tell;
        this.grade = grade;
        this.position = position;
    }

    public long getId(){
        return id;
    }

    public void setUsername(String username){
        this.username = username;
    }
    public String getUsername(){
        return username;
    }

    public void setPassword(String password){
        this.password = password;
    }
    public String getPassword(){
        return password;
    }

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }

    public void setTell(String tell){
        this.tell = tell;
    }
    public String getTell(){
        return tell;
    }

    public void setGrade(float grade){
        this.grade = grade;
    }
    public float getGrade(){
        return grade;
    }

    public void setRank(OrPosition position){
        this.position = position;
    }
    public OrPosition getPosition(){
        return position;
    }
    
}