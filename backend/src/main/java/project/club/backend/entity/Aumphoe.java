package project.club.backend.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

import java.sql.Date;
import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "aumphoe")
public class Aumphoe {

    @Id
    @SequenceGenerator(name="aumphoe_seq",sequenceName="aumphoe_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "aumphoe_seq")
    private @NonNull Long id;

    private @NonNull String aumphoe;
    
    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Changwat.class)
    @JoinColumn(name = "Changwat_ID", insertable = true)
    private Changwat changwatid;

    public void Aumphoe(){}

    
   public void setId(long id){
       this.id = id;
   }

   public Long getID(){
       return id;
   }
    
   public void setAumphoe(String aumphoe){
       this.aumphoe = aumphoe;
   }

   public String getAumphoe(){
       return aumphoe;
   }

public void setChangwatid(Changwat id) {
        this.changwatid = id;
    }

    public Changwat getChangwatid() {
        return changwatid;
    }

   
}
