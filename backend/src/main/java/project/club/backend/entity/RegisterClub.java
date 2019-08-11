package project.club.backend.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

import com.example.demo.Member;

import java.sql.Date;
import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "registerclub")
public class RegisterClub {

    @Id
    @SequenceGenerator(name="registerclub_seq",sequenceName="registerclub_seq")
    @GeneratedValue
    private @NonNull Long id;
    private @NonNull String nameclub;
    private @NonNull String facebookclube;
    private @NonNull String studentactivity;// กิจกรรมนักศึกษาด้าน 
    private @NonNull String clubadvisor; // อ.ที่ปรึกษษ
    private @NonNull String objective; // วัตถุประสงค์
    private @NonNull String activities; // กิจกรรมที่ว่าจะทำ
    



    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Member.class)
    @JoinColumn(name = "Member_ID", insertable = true)
    private Member memberid;
    



    private @NonNull  long studentid;
    private @NonNull String name;
    private @NonNull String nickname;
    private @NonNull Number tell;
    private String branch;;
    private String major;







    public void RegisterClub(){
        
    }
 
   
    public void setId(long id){
        this.id = id;
    }
 
    public Long getID(){
        return id;
    }
     
    public void setNameclube(String nameclub){
        this.nameclub = nameclub;
    }
 
    public String getNameclube(){
        return nameclub;
    }

    public void setFacebookclub(String facebookclube){
        this.facebookclube = facebookclube;
    }
 
    public String getFacebookclub(){
        return facebookclube;
    }

    public void setStudentactivity(String studentactivity){
        this.studentactivity = studentactivity;
    }

    public String getStudentactivity(){
        return studentactivity;
    }

    public void setClubadvisor(String clubadvisor){
        this.clubadvisor = clubadvisor;
    }

    public String getClubadvisor(){
        return clubadvisor;
    }

    public void setObjective(String objective){
        this.objective = objective;
    }

    public String getObjective(){
        return objective;
    }

    public void setActivities(String activities){
        this.activities = activities;
    }

    public String getActivities(){
        return activities;
    }

    //-----------------------------------------------

    public void setMemberid(Member memberid){
        this.memberid = memberid;
    }

    public Member getMemberid(){
        return memberid;
    }

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

    public void setMajor(String major){
        this.major = major;
    }
 
    public String getMajor(){
        return major;
    }

    public void setBranch(String branch){
        this.branch = branch;
    }

    public String getBranch(){
        return branch;
    }




 


	
}
