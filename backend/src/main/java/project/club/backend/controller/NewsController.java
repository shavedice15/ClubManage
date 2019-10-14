package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class NewsController {
    @Autowired private NewsRepository newsRepository;
    @Autowired private UsernameRepository usernameRepository;

    @GetMapping("/allNews")
    Collection<News> getAllNews() {
        return newsRepository.findAllOrderByDate();
    }

    @GetMapping("/news/{id}")
    public News getNews(@PathVariable long id) {
        News news = newsRepository.findById(id);
        return news;
    }

    @PostMapping("/addNews/{title}/{detail}/{date}") //เพิ่มประกาศข่าว
    public News addNews(@PathVariable String title,@PathVariable String detail,@PathVariable String date){
        LocalDate isDate = LocalDate.parse(date);         
        News news = new News(title,detail,isDate);  
        return newsRepository.save(news);
    }

    @DeleteMapping("/deleteNews/{id}") //ลบประกาศข่าว
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        newsRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/editRead/{username}/{read}") //แก้ไขpostที่อ่าน
    public Username editRead(@PathVariable String username,@PathVariable int read) {
        Username user = usernameRepository.findByUsername(username);
        user.setRead(read);
        return usernameRepository.save(user);
    }
}