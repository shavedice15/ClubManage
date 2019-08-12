package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class ActivityController {
    @Autowired private final ActivityRepository activityRepository;
    
   ActivityController(ActivityRepository activityRepository){
        this.activityRepository = activityRepository;
    }

    @GetMapping("/Activitys")
    public Collection<Activity> activitys() {
        return activityRepository.findAll().stream()
                .collect(Collectors.toList());
    }

}