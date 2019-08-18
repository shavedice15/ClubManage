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
@Table(name = "branch")
public class Branch {

    @Id
    @SequenceGenerator(name="branch_seq",sequenceName="branch_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "branch_seq")
    private @NonNull Long id;

    private @NonNull String branch;


    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Major.class)
    @JoinColumn(name = "Major_ID", insertable = true)
    private Major majorid;





    public void Branch(){
        
    }


   
    public void setId(long id){
        this.id = id;
    }
 
    public Long getID(){
        return id;
    }
     
    public void setBranch(String branch){
        this.branch = branch;
    }
 
    public String getBranch(){
        return branch;
    }
 
    public void setMajorid(Major id){
        this.majorid = id;
    }

    public Major getMajorid(){
        return majorid;
    }

	
}
