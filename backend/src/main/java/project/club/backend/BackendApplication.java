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
							PositionRepository positionRepository) {
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

			rankRepository.findAll().forEach(System.out::println);
			positionRepository.findAll().forEach(System.out::println);
			memberStatusRepository.findAll().forEach(System.out::println);
		};
	}
}
