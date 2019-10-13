package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class News {
    @Id
    @SequenceGenerator(name = "News_seq", sequenceName = "News_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "News_seq")
    @Column(name="News_ID")
    private @NonNull long id;

    private @NonNull String title;
    private @NonNull String detail;

    @JsonFormat(pattern="dd-MM-yyyy")
    private @NonNull LocalDate date;

    public News(){}
    public News (String title,String detail,LocalDate date){
        this.title = title;
        this.detail = detail;
        this.date = date;
    }
    public long getId(){
        return id;
    }

    public void setTitle(String title){
        this.title = title;
    }
    public String getTitle(){
        return title;
    }

    public void setDetail(String detail){
        this.detail = detail;
    }
    public String getDetail(){
        return detail;
    }

    public void setDate(LocalDate date){
        this.date = date;
    }
    public LocalDate getDate(){
        return date;
    }
}