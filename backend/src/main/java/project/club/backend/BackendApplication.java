package project.club.backend;

import project.club.backend.entity.*;
import project.club.backend.repository.*;
import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	ApplicationRunner init(MemberStatusRepository memberStatusRepository, RankRepository rankRepository,
							PositionRepository positionRepository, ClubRepository clubRepository,
							TypeClubRepository typeClubRepository, AdviserRepository adviserRepository,
							MemberRepository memberRepository, UsernameRepository usernameRepository,
							BudgetRepository budgetRepository, MemberClubRepository memberClubRepository,
							PrivacyRepository privacyRepository, ActivityRepository activityRepository,
							OrganizeRepository organizeRepository, OrPositionRepository orPositionRepository,
							ClubStatusRepository clubStatusRepository){
		return args -> {
			Stream.of("admin","member").forEach(rank -> {
				Rank newRank = new Rank(rank);
				rankRepository.save(newRank);
			});

			Stream.of("ประธานชมรม","รองประธานชมรม","เลขานุการ","เหรัญญิก","นายทะเบียน","ประชาสัมพันธ์",
						"พัสดุ","สมาชิก").forEach(position -> {
				Position newPosition = new Position(position);
				if(position == "สมาชิก") {
					newPosition.setRank(rankRepository.findById(2));
					positionRepository.save(newPosition);
				}
				else {
					newPosition.setRank(rankRepository.findById(1));
					positionRepository.save(newPosition);
				}
			});

			Stream.of("รอการตอบรับ","เป็นสมาชิก").forEach(memberStatus -> {
				MemberStatus newMemberStatus = new MemberStatus(memberStatus);
				memberStatusRepository.save(newMemberStatus);
			});

			Stream.of("ดนตรี","ศาสนา","กีฬา","อาหาร","เพื่อสังคม","เทคโนโลยี","วัฒนธรรม",
						"อื่นๆ").forEach(TypeClub -> {
				TypeClub newTypeClub = new TypeClub(TypeClub);
				typeClubRepository.save(newTypeClub);
			});

			//------------- ClubStatus -------------
			Stream.of("รอการจัดตั้ง","จัดตั้งแล้ว").forEach(status -> {
				ClubStatus clubStatus = new ClubStatus(status);
				clubStatusRepository.save(clubStatus);
			});

			//------------ Adviser -------------------------
			Adviser adviser1 = new Adviser("sdfs sfsdf","0879658412","sdf@dda.com","วิศวกรรมคอมพิวเตอร์");
			adviserRepository.save(adviser1);
			Adviser adviser2 = new Adviser("qwewq ouiou","0985415260","pvvv@hhhjm.com", "วิศวกรรมเคมี");
			adviserRepository.save(adviser2);

			//------------- Club ----------------------------
			Club club1 = new Club("ชมรมดนตรีสากล","กลุ่มดนตรีสากล","ดนตรีสากล","มาเล่นดนตรีกันเถอะ!",adviser1,typeClubRepository.findById(1),clubStatusRepository.findById(2));
			clubRepository.save(club1);
			Club club2 = new Club("ชมรมสมาธิ","กลุ่มชมรมนั่งสมาธิ","ชมรมนั่งสมาธิ","มานั่งสมาธิกันเถอะ!",adviser2,typeClubRepository.findById(2),clubStatusRepository.findById(2));
			clubRepository.save(club2);
			Club club3 = new Club("ชมรมเทนนิส","กลุ่มตีเทนนิส","ชมรมเทนนิส","มาตีเทนนิสกันเถอะ!",adviser2,typeClubRepository.findById(3),clubStatusRepository.findById(2));
			clubRepository.save(club3);

			//------------------ Member --------------------
			Member member1 = new Member("B5912345","นางสาวมณี แก้วก้าว","แก้ว","sut","ฝันให้ไกล ไปให้ถึง","0814587589","แนางม่จ้า แก้วก้าว","097654321","Mimi Mumu","3.40");
			memberRepository.save(member1);
			Username username1 = new Username("test@example.com","123456789",member1);
			usernameRepository.save(username1);

			Member member2 = new Member("B599765","นางสาวตะวัน ยามเช้า","พลอย","sut","อิอิ","0865412306","นางมิมิ ยามเช้า","0985632140","tawan fgh","3.20" );
			memberRepository.save(member2);
			Username username2 = new Username("test2","12345678",member2);
			usernameRepository.save(username2);

			//----------------------- Budget ----------------------
			LocalDate date1 = LocalDate.parse("2018-12-11");
			Club club = clubRepository.findById(2);
			Budget  budget1 = new Budget(club,10000,0,date1,"งบประจำภาคการศึกษา","");
			budgetRepository.save(budget1);

			LocalDate date2 = LocalDate.parse("2018-12-11");
			Budget  budget2 = new Budget(club,0,200,date2,"ซื้อขนมกิจกรรม","");
			budgetRepository.save(budget2);

			//-------------------- MemberClub -------------------
        	Position position1 = positionRepository.findById(8);
        	MemberStatus status1 = memberStatusRepository.findById(2);
			MemberClub memberClub1 = new MemberClub("อยากเล่นดนตรี",position1,status1,club1,member1);
			memberClubRepository.save(memberClub1);

			Position position3 = positionRepository.findById(8);
        	MemberStatus status3 = memberStatusRepository.findById(1);
			MemberClub memberClub3 = new MemberClub("อยากนั่งสมาธิ",position3,status3,club2,member2);
			memberClubRepository.save(memberClub3);

        	Position position2 = positionRepository.findById(1);
        	MemberStatus status2 = memberStatusRepository.findById(2);
			MemberClub memberClub2 = new MemberClub("อยากจิตใจสงบ",position2,status2,club2,member1);
			memberClubRepository.save(memberClub2);

			//---------------------- Privacy -------------------
			Stream.of("ทุกคน","เฉพาะคนในชมรม").forEach(status -> {
				Privacy privacy = new Privacy(status);
				privacyRepository.save(privacy);
			});

			//-------------------- Activity -------------------
			Privacy privacy = privacyRepository.findById(1);
			LocalDate dateStart = LocalDate.parse("2018-12-11");
			LocalDate dateEnd = LocalDate.parse("2018-12-11");
			Activity activity = new Activity(club1,privacy,"name",dateStart,dateEnd,"detail");
			activityRepository.save(activity);

			Privacy privacy2 = privacyRepository.findById(2);
			LocalDate dateStart2 = LocalDate.parse("2018-12-11");
			LocalDate dateEnd2 = LocalDate.parse("2018-12-11");
			Activity activity2 = new Activity(club1,privacy2,"name2",dateStart2,dateEnd2,"detail2");
			activityRepository.save(activity2);

			//---------------- OrPosition --------------
			Stream.of("นายกองค์การบริหาร","อุปนายกองค์การบริหาร คนที่หนึ่ง","อุปนายกองค์การบริหาร คนที่สอง",
						"เหรัญญิกองค์การบริหาร","เลขานุการองค์การบริหาร","เลขานุการนายกองค์การบริหาร",
						"เลขานุการอุปนายกองค์การบริหาร คนที่หนึ่ง","เลขานุการอุปนายกองค์การบริหาร คนที่สอง",
						"ประธานคณะอนุกรรมการวิชาการ","อนุกรรมการวิชาการ","ประธานคณะอนุกรรมการประสานงาน",
						"อนุกรรมการประสานงาน","ประธานคณะอนุกรรมการกีฬา","ประธานคณะอนุกรรมการประชาสัมพันธ์",
						"อนุกรรมการประชาสัมพันธ์","ประธานคณะอนุกรรมการนักศึกษาสัมพันธ์","อนุกรรมการนักศึกษาสัมพันธ์",
						"ประธานคณะอนุกรรมการศิลปวัฒนธรรม","อนุกรรมการศิลปวัฒนธรรม","ประธานคณะอนุกรรมการพัสดุ",
						"ประธานคณะอนุกรรมการบำเพ็ญประโยชน์","อนุกรรมการบำเพ็ญประโยชน์",
						"ประธานคณะอนุกรรมการตรวจสอบและประกันคุณภาพ").forEach(position -> {
				OrPosition orPosition = new OrPosition(position);
				orPositionRepository.save(orPosition);
			});

			//---------------- Organize -----------
			OrPosition orPosition1 = orPositionRepository.findById(1);
			Organize organize = new Organize("admin@test.com","123456789","name name","0845236987",3.00f,orPosition1);
			organizeRepository.save(organize);

			
		};
	}
}
