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

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "member")
public class Member {

    @Id
    @SequenceGenerator(name="member_seq",sequenceName="member_seq")
    @GeneratedValue
    private @NonNull Long id;


    private @NonNull  long studentid;
    private @NonNull String name;
    private @NonNull String nickname;
    private @NonNull String address;
    private @NonNull String motto;
    private @NonNull Date birthday;
    private @NonNull Number tell;
    private @NonNull String nameparent;
    private @NonNull Number tellparent;
    private @NonNull String facebook;


    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Major.class)
    @JoinColumn(name = "Major_ID", insertable = true)
    private Major majorid;
    private String major;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Branch.class)
    @JoinColumn(name = "Branch_ID", insertable = true)
    private Branch branchid;
    private String branch;


    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Changwat.class)
    @JoinColumn(name = "Position_ID", insertable = true)
    private Changwat changwatid;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Aumphoe.class)
    @JoinColumn(name = "Aumphoe_ID", insertable = true)
    private Aumphoe aumphoeid;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @Fetch(value=FetchMode.SUBSELECT)
    private Collection<MemberClub> memberClub;


    public void Member(){}

    public void setID(Long id){
        this.id = id;
    }

    public Long getId(){return id;}


    public void setStudentid(Long  studentid){
        this.studentid = studentid;
    }
 
    public Long getStudentid(){
        return studentid;
    }

    public void setName(String name){
        this.name = name;
    }
 
    public String getName(){
        return name;
    }

    public void setNickname(String nickname){
        this.nickname = nickname;
    }
 
    public String getNickname(){
        return nickname;
    }

    public void setAddredd(String address){
        this.address = address;
    }
 
    public String getAddress(){
        return address;
    }

    public void setMotto(String motto){
        this.motto = motto;
    }
 
    public String getMotto(){
        return motto;
    }

    public void setBirthday(Date birthday){
        this.birthday = birthday;
    }
 
    public Date getBirthday(){
        return birthday;
    }

    public void setTell(Number tell){
        this.tell = tell;
    }
 
    public Number getTell(){
        return tell;
    }

    public void setNameparent(String nameparent){
        this.nameparent = nameparent;
    }
 
    public String getNameparent(){
        return nameparent;
    }

    public void setTellparent(Number tellparent){
        this.tellparent = tellparent;
    }
 
    public Number getTellparent(){
        return tellparent;
    }

    public void setFacebook(String facebook){
        this.facebook = facebook;
    }
 
    public String getFacebook(){
        return facebook;
    }
    //---------------------------------------------------------------------------------------------------

    public void setMajorid(Major majorid){
        this.majorid = majorid;
    }
 
    public Major getMajorid(){
        return majorid;
    }

    public void setMajor(String major){
        this.major = major;
    }
 
    public String getMajor(){
        return major;
    }

    //---------------------------------------------------------------------------------------------------


    public void setBranchid(Branch branchid){
        this.branchid = branchid;
    }
 
    public Branch getBranchid(){
        return branchid;
    }


    public void setBranch(String branch){
        this.branch = branch;
    }

    public String getBranch(){
        return branch;
    }
    //---------------------------------------------------------------------------------------------------

 
    


    public void setChangwatid(Changwat changwatid){
        this.changwatid = changwatid;
    }
 
    public Changwat getChangwatid(){
        return changwatid;
    }


    public void setAumphoeid(Aumphoe aumphoeid){
        this.aumphoeid = aumphoeid;
    }
 
    public Aumphoe getAumphoeid(){
        return aumphoeid;
    }


    
    public void setMemberClub(Collection<MemberClub> memberClub) {
        this.memberClub = memberClub;
    }

    public Collection<MemberClub> getMemberClub() {
        return memberClub;
    }








	
}
