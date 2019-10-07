package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Adviser {
    @Id
    @SequenceGenerator(name = "adviser_seq", sequenceName = "adviser_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "adviser_seq")
    @Column(name="Adviser_ID")
    private @NonNull long id;

    private @NonNull String name;
    private @NonNull String tel;
    private @NonNull String email;
    private @NonNull String affiliates;
    public Adviser(){}
    public Adviser (String name, String tel, String email,String affiliates){
        this.name = name;
        this.tel = tel;
        this.email = email;
        this.affiliates = affiliates;
    }

    public void setAffiliates(String affiliates){
        this.affiliates = affiliates;
    }

    public String getAffiliates(){return this.affiliates; }
    
    public long getId(){
        return id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getTel() {
        return tel;
    }
    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}