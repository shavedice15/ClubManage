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
@Table(name = "changwat")
public class Changwat {

    @Id
    @SequenceGenerator(name="changwat_seq",sequenceName="changwat_seq")
    @GeneratedValue
    private @NonNull Long id;

    private @NonNull String changwat;

    public void Changwat(){
        
    }

    public void setId(long id){
        this.id = id;
    }
 
    public Long getID(){
        return id;
    }
     
    public void setChangwat(String changwat){
        this.changwat = changwat;
    }
 
    public String getChangwat(){
        return changwat;
    }
 



	
}
