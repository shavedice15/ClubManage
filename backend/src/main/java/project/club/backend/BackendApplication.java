package project.club.backend;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	ApplicationRunner init(MemberStatusRepository memberStatusRepository, RankRepository rankRepository,
							PositionRepository positionRepository, ClubRepository clubRepository,
							TypeClubRepository typeClubRepository, AdviserRepository adviserRepository) {
		return args -> {
			Stream.of("admin","member").forEach(rank -> {
				Rank newRank = new Rank(rank);
				rankRepository.save(newRank);
			});

			Stream.of("ประธานชมรม","รองประธานชมรม","เลขานุการ","เหรัญญิก","นายทะเบียน","ประชาสัมพันธ์",
						"พัสดุ","สมาชิก").forEach(position -> {
				Position newPosition = new Position(position);
				positionRepository.save(newPosition);
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
			//------------ Adviser -------------------------
			Adviser adviser1 = new Adviser("","","");
			adviserRepository.save(adviser1);
			Adviser adviser2 = new Adviser("","","");
			adviserRepository.save(adviser2);

			//------------- Club ----------------------------
			Club club1 = new Club("ชมรมดนตรีสากล","กลุ่มดนตรีสากล","ดนตรีสากล","มาเล่นดนตรีกันเถอะ!",adviser1,typeClubRepository.findById(1));
			clubRepository.save(club1);
			Club club2 = new Club("ชมรมสมาธิ","กลุ่มชมรมนั่งสมาธิ","ชมรมนั่งสมาธิ","มานั่งสมาธิกันเถอะ!",adviser2,typeClubRepository.findById(2));
			clubRepository.save(club2);

		};
	}
}
