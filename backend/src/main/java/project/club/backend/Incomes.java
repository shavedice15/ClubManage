package project.club.backend.entity;



//import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
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
@Table(name="Incomes")


@SpringBootApplication
public class Incomes {
	private @NonNull Long incomeId;
	private @NonNull int income;
	
	public Long getIncomeId(){
		return incomeId ;
	}

	public void setIncomeId(Long incomeId) {
        this.incomeId = incomeId;
	}
	
	public int getIncome(){
		return income ;
	}

	public void setIncome(int income) {
        this.income = income;
    }

	
}
