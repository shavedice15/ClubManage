package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;
import java.time.LocalDate;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class ActivityController {
    @Autowired private final ActivityRepository activityRepository;
    @Autowired private ClubRepository clubRepository;
    @Autowired private PrivacyRepository privacyRepository;
    
   ActivityController(ActivityRepository activityRepository){
        this.activityRepository = activityRepository;
    }

    @GetMapping("/Activitys")
    public Collection<Activity> activitys() {
        return activityRepository.getAllActivity();
    }

    @GetMapping("/activityByClub/{clubId}")
    public Collection<Activity> activityByClub(@PathVariable long clubId) {
        Club club = clubRepository.findById(clubId);
        return activityRepository.findByClubOrderByStartDateDesc(club);
    }

    @GetMapping("/activityAllUser/{clubId}")
    public Collection<Activity> activityAllUser(@PathVariable long clubId) {
        Privacy privacy = privacyRepository.findById(1);
        Club club = clubRepository.findById(clubId);
        return activityRepository.findByClubAndPrivacy(club,privacy);
    }

    @GetMapping("/activityAllUserAllClub")
    public Collection<Activity> activityAllUserAllClub() {
        Privacy privacy = privacyRepository.findById(1);
        return activityRepository.findByPrivacyOrderByStartDateDesc(privacy);
    }

    @GetMapping("/getActivity/{id}")
    public Activity getActivity(@PathVariable long id) {
        return activityRepository.findById(id);
    }

    @PostMapping("/activityPost/{clubId}/{name}/{startDate}/{endDate}/{privacyId}/{detail}")
    public Activity activityPost(@PathVariable long clubId,@PathVariable String name,
                                 @PathVariable String startDate,@PathVariable String endDate,
                                 @PathVariable long privacyId,@PathVariable String detail ) {
        Club club = clubRepository.findById(clubId);
        Privacy privacy = privacyRepository.findById(privacyId);
        LocalDate dateStart = LocalDate.parse(startDate);
        LocalDate dateEnd = LocalDate.parse(endDate);
        Activity activity = new Activity(club,privacy,name,dateStart,dateEnd,detail);
        return activityRepository.save(activity);
    }

}