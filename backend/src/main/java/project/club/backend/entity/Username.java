package project.club.backend.entity;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Username {
    @Id
    private String username;
    private String password;
    private int read;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Member_ID", referencedColumnName = "id")
    private Member member;

    public Username(){}

    public Username(String username, String password, Member member){
        this.username = username;
        this.password = password;
        this.member = member;
    }

    public String getUsername() {
        return this.username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Member getMember() {
        return this.member;
    }
    public void setMember(Member member) {
        this.member = member;
    }

    public int getRead() {
        return this.read;
    }
    public void setRead(int read) {
        this.read = read;
    }
}