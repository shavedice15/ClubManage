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
//@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "member")
public class Member {

    @Id
    @SequenceGenerator(name="member_seq",sequenceName="member_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq")
    private @NonNull Long id;


    private @NonNull String studentid;
    private @NonNull String name;
    private @NonNull String nickname;
    private @NonNull String address;
    private @NonNull String motto;
    private  Date birthday;
    private @NonNull String tell;
    private @NonNull String nameparent;
    private @NonNull String tellparent;
    private @NonNull String facebook;
    private String grad;
    private String classmember;

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
    private String changwat;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Aumphoe.class)
    @JoinColumn(name = "Aumphoe_ID", insertable = true)
    private Aumphoe aumphoeid;
    private String aumphoe;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @Fetch(value=FetchMode.SUBSELECT)
    private Collection<MemberClub> memberClub;


    public Member(){}

    public Member(String studentid, String name, String nickname, String address, String motto,
                    String tell, String nameparent, String tellparent,
                        String facebook, String grad, String classmember) {
        this.studentid = studentid;
        this.name = name;
        this.nickname = nickname;
        this.address = address;
        this.motto = motto;
        this.tell = tell;
        this.nameparent = nameparent;
        this.tellparent = tellparent;
        this.facebook = facebook;
        this.grad = grad;
        this.classmember = classmember;
    }
	public void setGrad(String grad){this.grad=grad;}
    public String getGrad(){return grad;}
    
    public void setClassmember(String classmember){this.classmember=classmember;}
    public String getClassmember(){return classmember;}
    
    
    public void setID(Long id){
        this.id = id;
    }

    public Long getId(){return id;}


    public void setStudentid(String  studentid){
        this.studentid = studentid;
    }
 
    public String getStudentid(){
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

    public void setTell(String tell){
        this.tell = tell;
    }
 
    public String getTell(){
        return tell;
    }

    public void setNameparent(String nameparent){
        this.nameparent = nameparent;
    }
 
    public String getNameparent(){
        return nameparent;
    }

    public void setTellparent(String tellparent){
        this.tellparent = tellparent;
    }
 
    public String getTellparent(){
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

    public void setChangwatname(String changwat){
        this.changwat =changwat;
    }
    public String getChangwatname(){return changwat;}


    public void setAumphoeid(Aumphoe aumphoeid){
        this.aumphoeid = aumphoeid;
    }
 
    public Aumphoe getAumphoeid(){
        return aumphoeid;
    }

    public void setAumphoename(String aumphoe){
        this.aumphoe = aumphoe;
    }

    public String getAumphoename(){return aumphoe;}

    
    public void setMemberClub(Collection<MemberClub> memberClub) {
        this.memberClub = memberClub;
    }

    public Collection<MemberClub> getMemberClub() {
        return memberClub;
    }








	
}
