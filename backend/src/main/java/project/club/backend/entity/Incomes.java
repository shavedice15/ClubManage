package project.club.backend.entity;
import lombok.*;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
//@Table(name="Incomes")


public class Incomes {
	@Id
    @SequenceGenerator(name = "incomes_seq", sequenceName = "incomes_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "incomes_seq")
    @Column(name="Incomes_ID")
	private @NonNull Long incomeId;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Club.class)
    @JoinColumn(name = "Club_ID", insertable = true)
	private Club club;

	private @NonNull int income;
	private @NonNull Date dateIncome;
	private @NonNull String detailIncome;

	public Incomes(){}
	public Incomes (Club club){
        this.club = club;
    }
	
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
	
	public Date getdateIncome(){
		return dateIncome ;
	}

	public void setIncomeId(Date dateIncome) {
        this.dateIncome = dateIncome;
	}

	public String getdetailIncome(){
		return detailIncome ;
	}

	public void setdetailIncome(String detailIncome) {
        this.detailIncome = detailIncome;
	}
}
