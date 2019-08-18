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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "changwat_seq")
    private @NonNull Long id;
    private @NonNull String changwat;
    private @NonNull Date varx;
    public void Changwat(){
        
    }

    public void setId(long id){
        this.id = id;
    }
 
    public Long getId(){
        return id;
    }
     
    public void setChangwat(String changwat){
        this.changwat = changwat;
    }
 
    public String getChangwat(){
        return changwat;
    }
 
    public void setVarx(Date varx){
        this.varx=varx;
    }

    public Date getVarx(){return varx;}


	
}
