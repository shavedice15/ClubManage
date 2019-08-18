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
@Table(name = "major")
public class Major {

    @Id
    @SequenceGenerator(name="major_seq",sequenceName="major_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "major_seq")
    private @NonNull Long id;


    private @NonNull String major;

    public void Major(){
        
    }
 

   
    public void setId(long id){
        this.id = id;
    }
 
    public Long getID(){
        return id;
    }
     
    public void setMajor(String major){
        this.major = major;
    }
 
    public String getMajor(){
        return major;
    }
 


	
}
