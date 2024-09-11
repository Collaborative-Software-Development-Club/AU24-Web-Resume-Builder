package resumebuilder.back_end.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResumeController {
    @GetMapping("/")
    public ResponseEntity<String> getMethodTest() {
        System.out.println("is in / path");
        return ResponseEntity.ok("the api is working");
    }
}
