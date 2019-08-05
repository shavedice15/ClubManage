package project.club.backend.entity;



//import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Data
@Entity
@Getter @Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="Years")



@SpringBootApplication
public class Years {

	private @NonNull Long yearId;
	private @NonNull String year;
	private @NonNull Date date;
	
	public Long getYearId(){
		return yearId ;
	}

	public void setYearId(Long yearId) {
        this.yearId = yearId;
	}
	
	public  Date getDate(){
		return date ;
	}

	public  void setDate(Date date) {
        this.date = date;
    }

	
}


