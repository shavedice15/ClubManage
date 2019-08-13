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
//@Table(name="Pays")

public class Pays {
	@Id
    @SequenceGenerator(name = "pays_seq", sequenceName = "pays_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pays_seq")
    @Column(name="Pays_ID")
	private @NonNull Long paysId;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Club.class)
    @JoinColumn(name = "Club_ID", insertable = true)
	private Club club;
	
	private @NonNull int pay;
	private @NonNull Date datePay;
	private @NonNull String detailPay;

	public Pays (){}
	public Pays (Club club){
        this.club = club;
    }
	
	public Long getPaysId(){
		return paysId ;
	}

	public void setPaysId(Long paysId) {
        this.paysId = paysId;
	}
	
	public int getPay(){
		return pay ;
	}

	public void setPay(int pay) {
        this.pay = pay;
	}
	
	public String getdetailPay(){
		return detailPay ;
	}

	public void setdetail(String detailPay) {
        this.detailPay = detailPay;
	}

	public Date getdatePay(){
		return datePay ;
	}

	public void setdatePay(Date datePay) {
        this.datePay = datePay;
	}

	
}
